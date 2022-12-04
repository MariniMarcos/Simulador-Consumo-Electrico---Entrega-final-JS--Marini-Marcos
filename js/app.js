
var capa = document.getElementById("capa");
var h1 = document.createElement("h1");
let consumoTotalUsuario = 0
let listaConsumoHistorico = []
let listaDatosUsuario = []
let chartConsumo = []


function recopilarDatosUsuario(){
    let temporal = {}
    listaDatosUsuario= JSON.parse(localStorage.getItem("listaDatosUsuario")) || []
    temporal.usuario=JSON.parse(localStorage.getItem('user'));
    temporal.contraseña=JSON.parse(localStorage.getItem('password'));
    fecha = new Date()
    fecha = fecha.toLocaleDateString()+' '+fecha.toLocaleTimeString()
    temporal.fecha = fecha
    listaDatosUsuario.push(temporal)
    localStorage.setItem ("listaDatosUsuario", JSON.stringify(listaDatosUsuario))
}

function refrescarHistorico (){
    chartConsumo = JSON.parse(localStorage.getItem("chartConsumo")) || []
    listaConsumoHistorico = JSON.parse(localStorage.getItem('historico')) || []
    let historico = document.getElementById("historico")  
    historico.innerHTML = "<h2>Sus consumos Históricos</h2> <br>" ; 
    //Iteramos el array con for...of
        for (const A of listaConsumoHistorico) {
            //Creamos un nodo <li> y agregamos al padre en cada ciclo
            let li = document.createElement("li");
            li.innerHTML = A + " Kw ⚡"
            historico.appendChild(li);
            historico.className = "historico"
        }
    graficar()                       
}
document.addEventListener('DOMContentLoaded', ()=>{
    refrescarHistorico()
})

document.querySelector(".boton_calculo")
.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
document.querySelector(".boton_calculo")
.addEventListener("click", () => {
    obtenerDatos(electrodomesticos);
});

const togglePassword = (button) => {
    button.classList.toggle("showing");
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
  };
  
function ingresoAlSimulador(){
    document.getElementById("logIn").style.display = "none";
    document.getElementById("simulador").style.display = "block";
}

function addResultado(texto){
    var resultado = document.getElementById("resultado");
    Swal.fire("Su consumo total es "+ consumoTotalUsuario + "Kw")
}
function hacerCalculos(electrodomesticos){
    consumoTotalUsuario = 0
    electrodomesticos.forEach(electrodomestico => {
        electrodomestico.ConsumoTotalProducto = electrodomestico.Kw * electrodomestico.cantidad * electrodomestico.Horas;
    });
    for(let i of electrodomesticos){
        consumoTotalUsuario+=i.ConsumoTotalProducto;
    }
    fecha = new Date()
    fecha = fecha.toLocaleDateString()+' '+fecha.toLocaleTimeString()
    // listaConsumoHistorico.push("Fecha: "+fecha + " - Consumo: "+consumoTotalUsuario)
    chartTemporal = {fecha: fecha, consumo:consumoTotalUsuario}
    chartConsumo.push(chartTemporal)
    localStorage.setItem("chartConsumo", JSON.stringify(chartConsumo))
    listaConsumoHistorico.push("Fecha " +chartTemporal.fecha +" "+ " Consumo " + chartTemporal.consumo) 
    localStorage.setItem('historico', JSON.stringify(listaConsumoHistorico))  
    refrescarHistorico()
    addResultado()

}
function obtenerDatos(electrodomesticos){
    electrodomesticos.forEach(electrodomestico => {
        electrodomestico.cantidad = document.getElementById(electrodomestico.idCantidad).value
        electrodomestico.Horas = document.getElementById(electrodomestico.idHoras).value
    });
    hacerCalculos(electrodomesticos);
}
function ingresarContraseña(){
    let password1 = document.getElementById ("password").value
    password1 === "" ? Swal.fire({icon: 'error',title: 'Ups...',text: 'Es necesario indicar contraseña!'}) : ingresoAlSimulador ();
    localStorage.setItem('password',JSON.stringify(password1));
}
function ingresarUsuario(){
     let entradaUsuario = document.getElementById("user").value
     entradaUsuario === "" ? Swal.fire({icon: 'error',title: 'Ups...',text: 'Es necesario indicar usuario !'}) : ingresarContraseña();
     localStorage.setItem('user',JSON.stringify(entradaUsuario));
     recopilarDatosUsuario()
}
function LogIn (){
    document.getElementById("simulador").style.display = "none";
}
function ModoOscuro(){
    let HeaderWeb = document.getElementById("simulador")
    HeaderWeb.classList.replace("header", "oscuro") 
}
function ModoClaro(){
    let HeaderWeb2 = document.getElementById("simulador")
    HeaderWeb2.classList.replace("oscuro", "header")
}

// CHART PARA CONSUMO HISTORICO METODO 1
function graficar(){
    var ctx= document.getElementById("myChart").getContext("2d");
    var myChart= new Chart(ctx,{
    type: "bar",
    data: {
        labels: chartConsumo.map(row => row.fecha),      
        datasets: [{
                label: 'Consumos Historicos',
                data: chartConsumo.map(row => row.consumo),
                backgroundColor: 'rgba(124, 252, 136, 0.69)',
                color: "rgb(255, 255, 255)",
        }]
    },
    options:{
        scales:{
            yAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
            }]
        }

    }
});
}
               
//     font: {
//     size: "20",
//     color: 'rgb(0, 0, 0',
// }