// ===============================
// بيانات القسم العلمي
// ===============================

const scientificSubjects = [
{name:"التربية الإسلامية",works:24,exam:56,total:80},
{name:"اللغة العربية",works:48,exam:112,total:160},
{name:"اللغة الإنجليزية",works:48,exam:112,total:160},
{name:"تقنية المعلومات",works:24,exam:56,total:80},
{name:"الرياضيات",works:60,exam:140,total:200},
{name:"الإحصاء",works:24,exam:56,total:80},
{name:"الفيزياء",works:60,exam:140,total:200},
{name:"الكيمياء",works:48,exam:112,total:160},
{name:"الأحياء",works:48,exam:112,total:160}
];

// ===============================
// بيانات القسم الأدبي
// ===============================

const literarySubjects = [
{name:"التربية الإسلامية",works:24,exam:56,total:80},
{name:"اللغة العربية",works:84,exam:196,total:280},
{name:"اللغة الإنجليزية",works:60,exam:140,total:200},
{name:"تقنية المعلومات",works:24,exam:56,total:80},
{name:"الإحصاء",works:24,exam:56,total:80},
{name:"التاريخ",works:36,exam:84,total:120},
{name:"الجغرافيا",works:36,exam:84,total:120},
{name:"الفلسفة",works:36,exam:84,total:120},
{name:"علم الاجتماع",works:24,exam:56,total:80},
{name:"علم النفس",works:24,exam:56,total:80}
];

// معرفة القسم المختار
const params = new URLSearchParams(window.location.search);
const section = params.get("section");

const subjects = section === "scientific"
? scientificSubjects
: literarySubjects;

// عناصر الصفحة
const tableBody = document.getElementById("tableBody");
const pageTitle = document.getElementById("pageTitle");

pageTitle.textContent =
section === "scientific"
? "القسم العلمي"
: "القسم الأدبي";
// =====================================
// إنشاء جدول المواد تلقائياً
// =====================================

subjects.forEach((subject, index) => {

tableBody.innerHTML += `

<tr>

<td>${subject.name}</td>

<td>

<input
type="number"
id="works${index}"
min="0"
max="${subject.works}"
step="1"
inputmode="numeric"
placeholder="0"
value="0">

<div>/ ${subject.works}</div>

</td>

<td>

<input
type="number"
id="exam${index}"
min="0"
max="${subject.exam}"
step="1"
inputmode="numeric"
placeholder="0"
value="0">

<div>/ ${subject.exam}</div>

</td>

<td id="total${index}">

0 / ${subject.total}

</td>

<td id="percent${index}">

0%

</td>

<td id="grade${index}">

-

</td>

<td id="result${index}">

-

</td>

</tr>

`;

});
// =====================================
// حساب كل مادة
// =====================================

function calculateRow(index){

const gradeCell = document.getElementById("grade"+index);
gradeCell.innerHTML = grade;

switch(grade){

case "ممتاز":
gradeCell.style.color="gold";
break;

case "جيد جداً":
gradeCell.style.color="limegreen";
break;

case "جيد":
gradeCell.style.color="dodgerblue";
break;

case "مقبول":
gradeCell.style.color="orange";
break;

default:
gradeCell.style.color="red";

}

const resultCell = document.getElementById("result"+index);

resultCell.innerHTML=result;

resultCell.style.fontWeight="bold";

if(result==="ناجح"){

resultCell.style.color="limegreen";

}else{

resultCell.style.color="red";

}

if(works > subjects[index].works){

works = subjects[index].works;

worksInput.value = works;

}

if(exam > subjects[index].exam){

exam = subjects[index].exam;

examInput.value = exam;

}

const total = works + exam;

const percent =
(total / subjects[index].total) * 100;

// التقدير

let grade = "";

if(percent >= 85){

grade = "ممتاز";

}else if(percent >=75){

grade = "جيد جداً";

}else if(percent >=65){

grade = "جيد";

}else if(percent >=50){

grade = "مقبول";

}else{

grade = "ضعيف";

}

// شروط النجاح


calculateSummary();

}
// =====================================
// ربط خانات الإدخال بالحساب
// =====================================

subjects.forEach((subject,index)=>{

document
.getElementById("works"+index)
.addEventListener("input",()=>{

calculateRow(index);

});

document
.getElementById("exam"+index)
.addEventListener("input",()=>{

calculateRow(index);

});

});

// =====================================
// حساب كل مادة
// =====================================

function calculateRow(index){

const worksInput = document.getElementById("works"+index);
const examInput = document.getElementById("exam"+index);

let works = Number(worksInput.value);
let exam = Number(examInput.value);

if(worksInput.value==="") works=0;
if(examInput.value==="") exam=0;

works=Math.floor(works);
exam=Math.floor(exam);

if(isNaN(works)) works = 0;
if(isNaN(exam)) exam = 0;

if(works < 0) works = 0;
if(exam < 0) exam = 0;

if(works > subjects[index].works){
works = subjects[index].works;
worksInput.value = works;
}

if(exam > subjects[index].exam){
exam = subjects[index].exam;
examInput.value = exam;
}

const total = works + exam;
const percent = (total / subjects[index].total) * 100;

// التقدير
let grade="";

if(percent>=85){
grade="ممتاز";
}else if(percent>=75){
grade="جيد جداً";
}else if(percent>=65){
grade="جيد";
}else if(percent>=50){
grade="مقبول";
}else{
grade="ضعيف";
}

// النجاح
const examSuccess = exam >= subjects[index].exam/2;
const totalSuccess = total >= subjects[index].total/2;

const result = examSuccess && totalSuccess ? "ناجح" : "راسب";

// عرض البيانات
document.getElementById("total"+index).innerHTML =
`${total} / ${subjects[index].total}`;

document.getElementById("percent"+index).innerHTML =
percent.toFixed(1)+"%";

document.getElementById("grade"+index).innerHTML =
grade;

document.getElementById("result"+index).innerHTML =
result;

calculateSummary();

}

// =====================================
// ربط الحقول
// =====================================

subjects.forEach((subject,index)=>{

document.getElementById("works"+index)
.addEventListener("input",function(){

calculateRow(index);

});

document.getElementById("exam"+index)
.addEventListener("input",function(){

calculateRow(index);

});

});

// =====================================
// حساب المجموع الكلي
// =====================================

function calculateSummary(){

let grandTotal=0;
let grandMax=0;
let allPassed=true;

subjects.forEach((subject,index)=>{

const works =
Number(document.getElementById("works"+index).value);

const exam =
Number(document.getElementById("exam"+index).value);

const total = works + exam;

grandTotal += total;

grandMax += subject.total;

if(exam < subject.exam/2 || total < subject.total/2){

allPassed=false;

}

});

const percentage = (grandTotal/grandMax)*100;

let grade="";

if(percentage>=85){
grade="ممتاز";
}else if(percentage>=75){
grade="جيد جداً";
}else if(percentage>=65){
grade="جيد";
}else if(percentage>=50){
grade="مقبول";
}else{
grade="ضعيف";
}

document.getElementById("grandTotal").innerHTML =
`${grandTotal} / ${grandMax}`;

document.getElementById("percentage").innerHTML =
percentage.toFixed(2)+"%";

document.getElementById("grade").innerHTML =
grade;

document.getElementById("finalResult").innerHTML =
allPassed ? "ناجح" : "راسب";

}

// =====================================
// مسح البيانات
// =====================================

document.getElementById("clearBtn")
.addEventListener("click",function(){

subjects.forEach((subject,index)=>{

document.getElementById("works"+index).value=0;
document.getElementById("exam"+index).value=0;

calculateRow(index);

});

});