async function windowActions() 
{
    const endpoint = "/api/dining";

    const request = await fetch(endpoint, { method: "get" });
    const halls = await request.json();

    const table = document.querySelector("#diningHallsTableBody");

    let html ="";

    halls.data.forEach((hall) =>
    {  
        html += `
        <tr>
            <td>${hall.hall_id}</td>
            <td>${hall.hall_name}</td>
            <td>${hall.hall_address}</td>
        </tr>
       `;
    });

    table.innerHTML = html;
}

window.onload = windowActions;