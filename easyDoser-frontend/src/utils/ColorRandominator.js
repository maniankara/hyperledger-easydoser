export default function materialColor (){
    // colors from https://github.com/egoist/color-lib/blob/master/color.json
    var colors = {
        "red": {
          "50": "#ffebee",
          "100": "#ffcdd2",
          "200": "#ef9a9a",
          "300": "#e57373",
          "400": "#ef5350",
          "500": "#f44336",
          "600": "#e53935",
          "700": "#d32f2f"
         
        },
 
      
    
     
        "blue": {
          "50": "#e3f2fd",
          "100": "#bbdefb",
          "200": "#90caf9",
          "300": "#64b5f6",
          "400": "#42a5f5",
          "500": "#2196f3",
          "600": "#1e88e5",
          "700": "#1976d2"
      
        },
        "lightBlue": {
         
          "400": "#29b6f6",
          "500": "#03a9f4",
          "600": "#039be5"
      
        },
        "cyan": {
     
          "300": "#4dd0e1",
          "400": "#26c6da",
          "500": "#00bcd4",
          "600": "#00acc1"
       
        },
        "teal": {
        
          "300": "#4db6ac",
          "400": "#26a69a",
          "500": "#009688"
     
        },
        "green": {
      
          "300": "#81c784",
          "400": "#66bb6a",
          "500": "#4caf50",
          "600": "#43a047"
       
        },
        "lightGreen": {
          "400": "#9ccc65",
          "500": "#8bc34a",
          "600": "#7cb342"

        },
 
        "orange": {
  
          "400": "#ffa726",
          "500": "#ff9800",
          "600": "#fb8c00",
          "700": "#f57c00"
          
        },
        "deepOrange": {

          "400": "#ff7043",
          "500": "#ff5722",
          "600": "#f4511e",
          "700": "#e64a19"
         
        },
     
        "grey": {

          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e"
       
        },
        "blueGrey": {
     
          "200": "#b0bec5",
          "300": "#90a4ae",
          "400": "#78909c"
       
        },
       
      }
      // pick random property
      //var property = pickRandomProperty(colors);
    var colorList = colors[pickRandomProperty(colors)];
    var newColorKey = pickRandomProperty(colorList);
    var newColor = colorList[newColorKey];
    return newColor;
  }
  function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
      if (Math.random() < 1 / ++count)
        result = prop;
    return result;
  }