

async function myFunction() {

    const start = performance.now();
    // const data = [
    //     { "userId": 10, "id": 197, "title": "dignissimos quo nobis earum saepe", "completed": true },
    //     { "userId": 10, "id": 198, "title": "quis eius est sint explicabo", "completed": true },
    //     { "userId": 10, "id": 199, "title": "numquam repellendus a magnam", "completed": true },
    //     { "userId": 10, "id": 200, "title": "ipsam aperiam voluptates qui", "completed": false }
    //   ];
    try {
        const response = await fetch('http://localhost:9000/');
        const data = await response.json();
        // in data we have two data : cacheValue and enabledRedis
        var Redis = "Off"
        if(data.enabledRedis)
            {
                Redis = "On";
                document.getElementById("redis").innerHTML = Redis;
            }
        else
            document.getElementById("redis").innerHTML = Redis;

        const tableBody = document.getElementById('tableBody');
        data.cacheValue.forEach(item => {
            const row = document.createElement('tr');
            const idCell = document.createElement('th');

            idCell.scope = 'row';
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            row.appendChild(titleCell);
    
            const completedCell = document.createElement('td');
            completedCell.textContent = item.completed;
            row.appendChild(completedCell);
    
            tableBody.appendChild(row);
            const end = performance.now();
            document.getElementById("performance1").innerHTML = "Your last request took :  ";
            document.getElementById("performance2").innerHTML = Math.round(end - start);
            document.getElementById("performance3").innerHTML = " ms ";

      });
    } catch (error) {
        alert('Error fetching data:', error);
    }
}

window.onload = myFunction;
