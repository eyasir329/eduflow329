-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eschool
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eschool
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eschool` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `eschool` ;

-- -----------------------------------------------------
-- Table `eschool`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`addresses` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NULL,
  `division` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NULL,
  `street_address` VARCHAR(255) NULL,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`socials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`socials` (
  `social_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(255) NULL,
  `facebook` VARCHAR(255) NULL,
  `linkedin` VARCHAR(255) NULL,
  `twitter` VARCHAR(255) NULL,
  PRIMARY KEY (`social_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`users` (
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `profile_pic` VARCHAR(255) NULL,
  `date_of_birth` DATE NULL,
  `nid` INT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`teaches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`teaches` (
  `teacher_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `joining_date` DATE NULL DEFAULT NULL,
  `position` VARCHAR(100) NOT NULL,
  `salary` DECIMAL(8,2) NOT NULL,
  `social_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `teacher_type` VARCHAR(45) NULL,
  PRIMARY KEY (`teacher_id`),
  UNIQUE INDEX `teacher_id_UNIQUE` (`teacher_id` ASC) VISIBLE,
  INDEX `fk_teaches_1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_teaches_2_idx` (`social_id` ASC) VISIBLE,
  INDEX `fk_teaches_3_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_teaches_1`
    FOREIGN KEY (`address_id`)
    REFERENCES `eschool`.`addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaches_2`
    FOREIGN KEY (`social_id`)
    REFERENCES `eschool`.`socials` (`social_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaches_3`
    FOREIGN KEY (`user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`parents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`parents` (
  `parent_id` INT NOT NULL,
  `father_user_id` INT NULL,
  `mother_user_id` INT NULL,
  `guardian_user_id` INT NULL,
  PRIMARY KEY (`parent_id`),
  INDEX `fk_parents_1_idx` (`father_user_id` ASC) VISIBLE,
  INDEX `fk_parents_2_idx` (`mother_user_id` ASC) VISIBLE,
  INDEX `fk_parents_3_idx` (`guardian_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_parents_1`
    FOREIGN KEY (`father_user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parents_2`
    FOREIGN KEY (`mother_user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parents_3`
    FOREIGN KEY (`guardian_user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`students` (
  `student_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `parent_id` INT NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `admitted_date` DATE NOT NULL,
  `class_id` INT NOT NULL,
  `social_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE INDEX `student_id_UNIQUE` (`student_id` ASC) VISIBLE,
  INDEX `fk_students_1_idx` (`class_id` ASC) VISIBLE,
  INDEX `fk_students_2_idx` (`social_id` ASC) VISIBLE,
  INDEX `fk_students_3_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_students_4_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_students_5_idx` (`parent_id` ASC) VISIBLE,
  CONSTRAINT `fk_students_1`
    FOREIGN KEY (`class_id`)
    REFERENCES `eschool`.`academics` (`class_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_students_2`
    FOREIGN KEY (`social_id`)
    REFERENCES `eschool`.`socials` (`social_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_3`
    FOREIGN KEY (`address_id`)
    REFERENCES `eschool`.`addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_4`
    FOREIGN KEY (`user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_5`
    FOREIGN KEY (`parent_id`)
    REFERENCES `eschool`.`parents` (`parent_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`academics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`academics` (
  `class_id` INT NOT NULL,
  `class_name` VARCHAR(20) NOT NULL,
  `session` VARCHAR(45) NOT NULL,
  `class_teacher_id` INT NULL,
  `class_captain_id` INT NULL,
  `room_number` INT NULL,
  PRIMARY KEY (`class_id`),
  UNIQUE INDEX `academic_id_UNIQUE` (`class_id` ASC) VISIBLE,
  INDEX `fk_academics_1_idx` (`class_teacher_id` ASC) VISIBLE,
  INDEX `fk_academics_2_idx` (`class_captain_id` ASC) VISIBLE,
  CONSTRAINT `fk_academics_1`
    FOREIGN KEY (`class_teacher_id`)
    REFERENCES `eschool`.`teaches` (`teacher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_academics_2`
    FOREIGN KEY (`class_captain_id`)
    REFERENCES `eschool`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`subjects` (
  `subject_id` INT NOT NULL,
  `teacher_id` INT NOT NULL,
  `sub_name` VARCHAR(255) NOT NULL,
  `class_id` INT NOT NULL,
  `syllabus` VARCHAR(45) NULL,
  `book` VARCHAR(45) NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE INDEX `subject_id_UNIQUE` (`subject_id` ASC) VISIBLE,
  INDEX `fk_subjects_1_idx` (`class_id` ASC) VISIBLE,
  INDEX `index4` () VISIBLE,
  INDEX `fk_subjects_2_idx` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `fk_subjects_1`
    FOREIGN KEY (`class_id`)
    REFERENCES `eschool`.`academics` (`class_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subjects_2`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `eschool`.`teaches` (`teacher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`attendance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`attendance` (
  `student_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `present_status` INT NULL DEFAULT NULL,
  `absent_status` INT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  INDEX `fk_attendance_1_idx` (`student_id` ASC) VISIBLE,
  INDEX `fk_attendance_2_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `fk_attendance_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `eschool`.`students` (`student_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_attendance_2`
    FOREIGN KEY (`subject_id`)
    REFERENCES `eschool`.`subjects` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`exam_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`exam_info` (
  `exam_id` INT NOT NULL AUTO_INCREMENT,
  `exam_name` VARCHAR(45) NOT NULL,
  `exam_held` DATE NOT NULL,
  PRIMARY KEY (`exam_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`marks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`marks` (
  `mark_id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `cq` DECIMAL(5,2) NULL DEFAULT NULL,
  `mcq` DECIMAL(5,2) NULL DEFAULT NULL,
  `attendance_percentage` INT NULL DEFAULT NULL,
  `homework_percentage` INT NULL DEFAULT NULL,
  PRIMARY KEY (`mark_id`),
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  INDEX `fk_marks_1_idx` (`exam_id` ASC) VISIBLE,
  CONSTRAINT `marks_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `eschool`.`students` (`student_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `marks_ibfk_2`
    FOREIGN KEY (`subject_id`)
    REFERENCES `eschool`.`subjects` (`subject_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_marks_1`
    FOREIGN KEY (`exam_id`)
    REFERENCES `eschool`.`exam_info` (`exam_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1012
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `eschool`.`notice_board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`notice_board` (
  `notice_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`notice_id`),
  UNIQUE INDEX `notice_id_UNIQUE` (`notice_id` ASC) VISIBLE,
  INDEX `fk_notice_board_1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_notice_board_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`principals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`principals` (
  `teacher_id` INT NOT NULL,
  `principal_speech` VARCHAR(3000) NULL DEFAULT NULL,
  `joining_date` DATE NOT NULL,
  `ending_date` DATE NULL DEFAULT NULL,
  INDEX `teacher_id` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `principals_ibfk_1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `eschool`.`teaches` (`teacher_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`school`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`school` (
  `school_name` VARCHAR(255) NOT NULL,
  `eiin_number` VARCHAR(25) NOT NULL,
  `established_at` DATE NOT NULL,
  `history` VARCHAR(3000) NULL DEFAULT NULL,
  `logo` VARCHAR(255) NULL DEFAULT NULL,
  `social_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`eiin_number`),
  UNIQUE INDEX `eiin_UNIQUE` (`eiin_number` ASC) VISIBLE,
  INDEX `fk_school_1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_school_2_idx` (`social_id` ASC) VISIBLE,
  CONSTRAINT `fk_school_1`
    FOREIGN KEY (`address_id`)
    REFERENCES `eschool`.`addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_school_2`
    FOREIGN KEY (`social_id`)
    REFERENCES `eschool`.`socials` (`social_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`staffs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`staffs` (
  `staff_id` INT NOT NULL,
  `joining_date` DATE NULL,
  `position` VARCHAR(100) NOT NULL,
  `salary` DECIMAL(8,2) NOT NULL,
  `social_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE INDEX `staff_id_UNIQUE` (`staff_id` ASC) VISIBLE,
  INDEX `fk_staffs_1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_staffs_2_idx` (`social_id` ASC) VISIBLE,
  INDEX `fk_staffs_3_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_staffs_1`
    FOREIGN KEY (`address_id`)
    REFERENCES `eschool`.`addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_staffs_2`
    FOREIGN KEY (`social_id`)
    REFERENCES `eschool`.`socials` (`social_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_staffs_3`
    FOREIGN KEY (`user_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eschool`.`homeworks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`homeworks` (
  `homework_id` INT NOT NULL AUTO_INCREMENT,
  `subject_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `content` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NULL,
  PRIMARY KEY (`homework_id`),
  INDEX `fk_homeworks_1_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `fk_homeworks_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `eschool`.`subjects` (`subject_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`homework_marks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`homework_marks` (
  `homework_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `content` VARCHAR(45) NULL,
  `time_left` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NULL,
  UNIQUE INDEX `student_id_UNIQUE` (`student_id` ASC) VISIBLE,
  UNIQUE INDEX `homework_id_UNIQUE` (`homework_id` ASC) VISIBLE,
  CONSTRAINT `fk_homework_marks_1`
    FOREIGN KEY (`homework_id`)
    REFERENCES `eschool`.`homeworks` (`homework_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_homework_marks_2`
    FOREIGN KEY (`student_id`)
    REFERENCES `eschool`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eschool`.`guest_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eschool`.`guest_messages` (
  `guest_id` INT NOT NULL,
  `social_id` INT NOT NULL,
  `message` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NULL,
  `feedback_status` VARCHAR(45) NULL,
  UNIQUE INDEX `guest_id_UNIQUE` (`guest_id` ASC) VISIBLE,
  INDEX `fk_guest_messages_2_idx` (`social_id` ASC) VISIBLE,
  CONSTRAINT `fk_guest_messages_1`
    FOREIGN KEY (`guest_id`)
    REFERENCES `eschool`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_guest_messages_2`
    FOREIGN KEY (`social_id`)
    REFERENCES `eschool`.`socials` (`social_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
