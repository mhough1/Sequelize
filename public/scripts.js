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

    async function generateRandomArray()
    {
        // Generate array
        let arr = Array.from({length: 10}, () => Math.floor(Math.random() * 45) + 1);
        
        // Populate array with macros
        let mealMacroArray = [];
        for (x = 0; x < arr.length; x++)
        {
            const mealMacroReq = await fetch(`/api/mm/${arr[x]}`, {headers: {'Content-type': 'application/json; charset=UTF-8'}});

            const mealMacro = await mealMacroReq.json();
            mealMacroArray[x] = mealMacro[0];
        }
        //console.log(mealMacroArray);

        return mealMacroArray;
    }
    
    const workingArr = await generateRandomArray();
    workingArr.sort(function(a,b) {return a.meal_id - b.meal_id});

    const mealTable = document.querySelector("#mealsTableBody");

    let html2 ="";

    workingArr.forEach((mm) =>
    {  
        html2 += `
        <tr>
            <td>${mm.meal_id}</td>
            <td>${mm.meal_name}</td>
            <td>${mm.calories}</td>
            <td>${mm.carbs}</td>
            <td>${mm.sodium}</td>
            <td>${mm.protein}</td>
            <td>${mm.fat}</td>
            <td>${mm.cholesterol}</td>
        </tr>
       `;
    });

    mealTable.innerHTML = html2;

    // Meal chart
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:
        {
            text: "Meals"
        },
        axisX: 
        {
            valueFormatString: "###",
            title: "Meals"
        },
        axisY: 
        {
            title: "Macros"
        },
        toolTip: 
        {
            shared: true
        },
        legend:
        {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Calories",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].calories, label: workingArr[0].meal_name},
                { y: workingArr[1].calories, label: workingArr[1].meal_name },
                { y: workingArr[2].calories, label: workingArr[2].meal_name },
                { y: workingArr[3].calories, label: workingArr[3].meal_name },
                { y: workingArr[4].calories, label: workingArr[4].meal_name },
                { y: workingArr[5].calories, label: workingArr[5].meal_name },
                { y: workingArr[6].calories, label: workingArr[6].meal_name },
                { y: workingArr[7].calories, label: workingArr[7].meal_name },
                { y: workingArr[8].calories, label: workingArr[8].meal_name },
                { y: workingArr[9].calories, label: workingArr[9].meal_name }
            ]
        },
        {
            type: "stackedBar",
            name: "Carbs",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].carbs, label: workingArr[0].meal_name},
                { y: workingArr[1].carbs, label: workingArr[1].meal_name },
                { y: workingArr[2].carbs, label: workingArr[2].meal_name },
                { y: workingArr[3].carbs, label: workingArr[3].meal_name },
                { y: workingArr[4].carbs, label: workingArr[4].meal_name },
                { y: workingArr[5].carbs, label: workingArr[5].meal_name },
                { y: workingArr[6].carbs, label: workingArr[6].meal_name },
                { y: workingArr[7].carbs, label: workingArr[7].meal_name },
                { y: workingArr[8].carbs, label: workingArr[8].meal_name },
                { y: workingArr[9].carbs, label: workingArr[9].meal_name }
            ]
        },
        {
            type: "stackedBar",
            name: "Sodium",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].sodium, label: workingArr[0].meal_name},
                { y: workingArr[1].sodium, label: workingArr[1].meal_name },
                { y: workingArr[2].sodium, label: workingArr[2].meal_name },
                { y: workingArr[3].sodium, label: workingArr[3].meal_name },
                { y: workingArr[4].sodium, label: workingArr[4].meal_name },
                { y: workingArr[5].sodium, label: workingArr[5].meal_name },
                { y: workingArr[6].sodium, label: workingArr[6].meal_name },
                { y: workingArr[7].sodium, label: workingArr[7].meal_name },
                { y: workingArr[8].sodium, label: workingArr[8].meal_name },
                { y: workingArr[9].sodium, label: workingArr[9].meal_name }
            ]
        },
        {
            type: "stackedBar",
            name: "Protein",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].protein, label: workingArr[0].meal_name},
                { y: workingArr[1].protein, label: workingArr[1].meal_name },
                { y: workingArr[2].protein, label: workingArr[2].meal_name },
                { y: workingArr[3].protein, label: workingArr[3].meal_name },
                { y: workingArr[4].protein, label: workingArr[4].meal_name },
                { y: workingArr[5].protein, label: workingArr[5].meal_name },
                { y: workingArr[6].protein, label: workingArr[6].meal_name },
                { y: workingArr[7].protein, label: workingArr[7].meal_name },
                { y: workingArr[8].protein, label: workingArr[8].meal_name },
                { y: workingArr[9].protein, label: workingArr[9].meal_name }
            ]
        },
        {
            type: "stackedBar",
            name: "Fat",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].fat, label: workingArr[0].meal_name},
                { y: workingArr[1].fat, label: workingArr[1].meal_name },
                { y: workingArr[2].fat, label: workingArr[2].meal_name },
                { y: workingArr[3].fat, label: workingArr[3].meal_name },
                { y: workingArr[4].fat, label: workingArr[4].meal_name },
                { y: workingArr[5].fat, label: workingArr[5].meal_name },
                { y: workingArr[6].fat, label: workingArr[6].meal_name },
                { y: workingArr[7].fat, label: workingArr[7].meal_name },
                { y: workingArr[8].fat, label: workingArr[8].meal_name },
                { y: workingArr[9].fat, label: workingArr[9].meal_name }
            ]
        },
        {
            type: "stackedBar",
            name: "Cholesterol",
            showInLegend: "true",
            xValueFormatString: "###",
            yValueFormatString: "#,###",
            dataPoints: [
                { y: workingArr[0].cholesterol, label: workingArr[0].meal_name},
                { y: workingArr[1].cholesterol, label: workingArr[1].meal_name },
                { y: workingArr[2].cholesterol, label: workingArr[2].meal_name },
                { y: workingArr[3].cholesterol, label: workingArr[3].meal_name },
                { y: workingArr[4].cholesterol, label: workingArr[4].meal_name },
                { y: workingArr[5].cholesterol, label: workingArr[5].meal_name },
                { y: workingArr[6].cholesterol, label: workingArr[6].meal_name },
                { y: workingArr[7].cholesterol, label: workingArr[7].meal_name },
                { y: workingArr[8].cholesterol, label: workingArr[8].meal_name },
                { y: workingArr[9].cholesterol, label: workingArr[9].meal_name }
            ]
        }
    ]
    });

    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
        }

    chart.render();
    
}
window.onload = windowActions;