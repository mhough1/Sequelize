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

    // Meal chart
    
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Ten Meals"
        },
        axisX: {
            valueFormatString: "###"
        },
        axisY: {
            prefix: ""
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer"
        },
        data: [{
            type: "stackedBar",
            name: "Meals",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { label: "Sodium", y: 20 },
                { label: "Calories", y: 100 }
            ]
        }]
    });
    chart.render();
}

window.onload = windowActions;