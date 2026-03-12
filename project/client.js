document.getElementById("loadInfo").addEventListener("click", async () => {
    const res = await fetch("/api/info");
    const data = await res.json();
    document.getElementById("info").innerHTML = `
        <p>Mission: ${data.misioon}</p>
        <p>Team: ${data.meeskond}</p>
        <p>Time: ${data.aeg}</p>
    `;
});

document.getElementById("loadUsers").addEventListener("click", async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    const ul = document.getElementById("users");
    ul.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.email; // или user.name
        ul.appendChild(li);
    });
});