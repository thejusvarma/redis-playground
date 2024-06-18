const client  = require('./client')

async function init()
{
    await client.set('name:1','Thejus');
    var result = await client.get('name:1');
    //to expire a value after certain seconds
    await client.expire('name:1',10)
    console.log(result);
}

init();