export const channel_list = async ()=>{
    var res = await fetch("http://localhost:8080/channel_list");
    console.log(res)
    return res.json();
}
export const channel_info = async (name)=>{
    var res = await fetch("http://localhost:8080/channel_info/"+name);
    console.log(res)
    return res.json();
}