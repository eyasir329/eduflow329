--academic class student count
SELECT
    COUNT(student_id) as total_student
FROM
    student_status as ss,
    academic_classes as ac,
    academics as a,
    students as s
WHERE
    ss.academic_class_id = ac.academic_class_id
    and ac.class_id = c.class_id
GROUP BY
    c.class_id;

SELECT
    a.academic_id,
    ac.academic_class_id,
    c.class_name,
    ss.student_id,
    ac.class_teacher_id,
    a.start_from
from
    academic_classes as ac,
    classrooms as c,
    academics as a,
    student_status as ss;
WHERE
    ac.class_id = c.class_id;

    --result

select
    type_name,
    exam_held,
    student_id,
    subject_id,
    cq,
    mcq
from
    ex_type as e,
    exams,
    marks as m,

where
    m.exam_id = exams.type_id
    and exams.type_id = e.type_id;

    INSERT INTO marks(exam_id, student_id, subject_id, cq, mcq)
SELECT
    FLOOR(RAND() * 5) + 1 as exam_id,
    FLOOR(RAND() * 306) + 1 as student_id,
    FLOOR(RAND() * 16) + 1 as subject_id,
    FLOOR(RAND() * 60) as cq,
    FLOOR(RAND() * 40) as mcq
LIMIT 1530;

--

SELECT
    CONCAT(s.first_name, " ", s.last_name) as student_fullname,
    sub.subject_id+100,
    a.class_name,
    a.class_teacher_id,
    CONCAT(t.first_name, " ", t.last_name) as teacher_fullname,
    YEAR(a.start_from),
    cq+mcq
FROM
    students as s,
    subjects as sub,
    marks as m,
    student_status as ss,
    academics as a,
    teaches as t
WHERE
    s.student_id = m.student_id
    and m.subject_id = sub.subject_id
    and ss.student_id = m.student_id
    and ss.academic_id = a.academic_id
    and a.academic_id=1
    and a.class_teacher_id=t.teacher_id
    ;

-- exam
  --and m.subject_id=1
  --et.type_name,
  --e.exam_held
select
    ss.academic_id,
    et.type_name,
    e.exam_held,
    m.student_id,
    m.subject_id,
    m.cq+m.mcq as total
from
    exams as e,
    ex_type as et,
    marks as m,
    student_status as ss,
    students as s
where
    e.exam_id=m.exam_id
    and m.student_id=ss.student_id
    and ss.student_id=s.student_id
    and ss.academic_id=1
    and et.type_id=1 and m.subject_id<=5;
;

--student in same class

SELECT
    s.student_id as id,
    CONCAT(s.image_src,'png') as picture,
    s.first_name,
    s.gender,
    YEAR(s.date_of_birth),
    s.email
FROM
    students as s,
    student_status as ss,
    addresses as ad
WHERE
    s.student_id = ss.student_id
    and ss.academic_id = 1;


-----
SELECT
    s.student_id as id,
    CONCAT(s.image_src,'.png') as picture,
    CONCAT(s.first_name,' ',s.last_name) as student_name,
    s.gender as gender,
    YEAR(s.date_of_birth) as birthyear,
    s.email,
    s.phone as phone,
    CONCAT(f.first_name,' ',f.last_name) as father,
    CONCAT(m.first_name,' ',m.last_name) as mother,
    CONCAT(a.division,', ',a.district,', ',a.upazilla,', ',a.postal_code) as address,
    ac.class_name as class,
    CONCAT(t.first_name,' ',t.last_name) as class_teacher,
    et.type_name as exam_type,
    e.exam_held,
    mk.subject_id+100 as sub_code, 
    sub.sub_name,
    mk.cq+mk.mcq as mark,
    CASE
		WHEN mk.cq+mk.mcq>=33 THEN 'Passed'
        ELSE 'Failed'
	END AS qualification
FROM
students as s
JOIN student_status as ss ON ss.student_id=s.student_id
JOIN addresses as a ON a.address_id=s.address_id
JOIN academics as ac ON ac.academic_id=ss.academic_id
JOIN teaches as t ON ac.class_teacher_id=t.teacher_id
JOIN marks as mk ON s.student_id=mk.student_id and mk.subject_id IN(SELECT subject_id FROM subjects WHERE subject_id=10)
JOIN exams as e ON e.exam_id=mk.exam_id
JOIN ex_type as et ON e.type_id=et.type_id
JOIN subjects as sub ON sub.subject_id=mk.subject_id
JOIN student_parent as spf ON s.student_id=spf.student_id
JOIN parents as f ON spf.parent_id=f.parent_id AND spf.relation='father'
JOIN student_parent as spm ON s.student_id=spm.student_id
JOIN parents as m ON spm.parent_id=m.parent_id AND spm.relation='mother'
WHERE
    s.student_id = ss.student_id
    and ss.academic_id>5 order by ss.academic_id;

----


-----student table
SELECT
    s.student_id as id,
    CONCAT(s.image_src,'.png') as picture,
    CONCAT(s.first_name,' ',s.last_name) as student_name,
    s.gender as gender,
    YEAR(s.date_of_birth) as birth,
    s.email,
    s.phone as phone,
    CONCAT(a.division,', ',a.district,', ',a.upazilla,', ',a.postal_code) as student_address,
    CONCAT(f.first_name,' ',f.last_name) as father_name,
    CONCAT(f.image_src,'.png') as father_picture,
    f.nid as father_nid,
    f.phone as father_phone,
    f.email as father_email,
    CONCAT(m.first_name,' ',m.last_name) as mother_name,
    CONCAT(m.image_src,'.png') as mother_picture,
    m.nid as mother_nid,
    ac.class_name as class
FROM
students as s
JOIN student_status as ss ON ss.student_id=s.student_id
JOIN addresses as a ON a.address_id=s.address_id
JOIN academics as ac ON ac.academic_id=ss.academic_id
JOIN teaches as t ON ac.class_teacher_id=t.teacher_id
JOIN student_parent as spf ON s.student_id=spf.student_id
JOIN parents as f ON spf.parent_id=f.parent_id AND spf.relation='father'
JOIN student_parent as spm ON s.student_id=spm.student_id
JOIN parents as m ON spm.parent_id=m.parent_id AND spm.relation='mother'
WHERE
    s.student_id = ss.student_id
    order by s.student_id LIMIT 20;


    