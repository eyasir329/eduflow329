// INSERT INTO marks(exam_id, student_id, subject_id, cq, mcq)
// SELECT
//     FLOOR(RAND() * 5) + 1 as exam_id,
//     FLOOR(RAND() * 306) + 1 as student_id,
//     FLOOR(RAND() * 16) + 1 as subject_id,
//     FLOOR(RAND() * 60) as cq,
//     FLOOR(RAND() * 40) as mcq
// LIMIT 1530;



for(var i=0;i<5*306;i++){
    var a = Math.floor(Math.random()*5)+1;
var b = Math.floor(Math.random()*306)+1;
var c = Math.floor(Math.random()*16)+1;
var d = Math.floor(Math.random()*60)+1;
var e = Math.floor(Math.random()*40)+1;
    console.log("("+a+","+b+","+c+","+d+","+e+")"+",");
}
