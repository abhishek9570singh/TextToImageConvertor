const key = "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";  /*to access Api key*/
const inputText = document.getElementById("input");  /*to access input text*/
const image = document.getElementById("image");   /*to access image*/
const GenBtn = document.getElementById("btn");   /*to access Generate button*/
const svg = document.getElementById("svg");   /*to access svg*/
const load = document.getElementById("loading");    /*to access load*/
const ResetBtn = document.getElementById("reset");    /*to access reset button*/
const downloadBtn = document.getElementById("download");    /*to access download button*/

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization:`Bearer ${key}`
				
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob();
	image.style.display="block";
	load.style.display="none";
	return result;
}
async function  generate() {
	
 load.style.display="block";
query().then((response) => {
	const objectUrl = URL.createObjectURL(response);
	image.src = objectUrl;
	downloadBtn.addEventListener("click" , ()=>{
		download(objectUrl)
	})

	
});
}

GenBtn.addEventListener( "click" , () =>{
	generate();
		svg.style.display="none"

});

inputText.addEventListener( "keydown" , (e) =>{
   if(e.key == "Enter")
   {
	generate();
	svg.style.display="none"
   }
   
})
ResetBtn.addEventListener ("click" , () =>{
    inputText.value = ""
	window.location.reload();

})
 function download(objectUrl){


 fetch(objectUrl).then(res=>res.blob())
 .then(file=>{
	let a = document.createElement("a");
	a.href = URL.createObjectURL(file);
    a.download = new Date().getTime();
	a.click();
 })
 .catch(()=> alert("failed Download"));
}

