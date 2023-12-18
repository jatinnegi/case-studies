# Database Design: Appointment Booking System

### Overview

Appointment booking system will allow different patients to book appointments with different doctors working in different clinics at different time slots.

---

### High Level Design

Following are the tables we will need for our appointment booking system:

- **Doctors table:** to keep records of all doctors.
- **Clinics table:** to keep records of all clinics.
- **Patients table:** to keep records of all patients.
- **Time slots table:** to keep records of all available time slots.
- **DoctorsClinics table:** to describe a many to many relationship between doctors and clinics since different doctors can work at different clinics.
- **Appointments table:** to keep records of all available appointments.

---

### Low Level Design

Following is the detail implementation of each table specified in the previous section:

**1. Doctors Table**

```sql
create table doctors (
    doctorId int primary key auto_increment,
    name varchar(255) not null
);
```

Doctors table contains a name column and primary key **(doctorId)** column to uniquely identify a doctor.

**2. Clinics Table**

```sql
create table clinics (
    clinicId int primary key auto_increment,
    name varchar(255) not null
);
```

Clinics table contains a name column and primary key **(clinicId)** column to uniquely identify a clinic.

**3. Patients Table**

```sql
create table patients (
    patientId int primary key auto_increment,
    name varchar(255) not null
);
```

Patients table contains a name column and primary key **(patientId)** column to uniquely identify a patient.

**4. Time Slots Table**

```sql
create table time_slots (
    timeSlotId int primary key auto_increment,
    startTime time,
    endTime time
);
```

Time slots table contains startTime and endTime columns of data type **time** to represent the start and end time of an appointment. The **(timeSlotId)** primary key uniquely identifies a time slot.

**5. DoctorsClinics Table**

```sql
create table doctors_clinics (
    doctorId int,
    clinicId int,
    primary key(doctorId, clinicId),
    foreign key(doctorId) references doctors(doctorId),
    foreign key(clinicId) references clinics(clinicId)
);
```

doctors_clinics table describes a relationship between a doctor and clinic. In this case it is a many to many relationship since one doctor can work in multiple clinics and one clinic can have multiple doctors working there. The primary key here is the **composite** of **doctorId** and **clinicId** so we only have one row for each combination of doctor and clinic.

**6. Appointments Table**

```sql
create table appointments (
    appointmentId int primary key auto_increment,
    timeSlotId int not null,
    doctorId int not null,
    clinicId int not null,
    patientId int,
    date date not null,
    unique (doctorId, timeSlotId, date),
    foreign key(timeSlotId) references time_slots(timeSlotId),
    foreign key(doctorId, clinicId) references doctors_clinics(doctorId, clinicId),
    foreign key(patientId) references patients(patientId)
);
```

Appointments table contains a **timeSlotId** to represent a time slot from **time_slots** table, **doctorId** to represent a doctor from **doctors** table, **clinicId** to represent a clinic from **clinics** table, **patientId** to represent a patient from **patients** table. There is a date column of data type **date**. Additionally the **patientId** column is nullable. A row where the **patientId** is null simply means that the appointment is not booked. One patient can book multiple appointments but one appointment can only be booked by one patient so this has a one-to-many relationship between patients and appointments. There is a **unique constraint** between **doctorId, timeSlotId, date** which ensures that the same doctor cannot be booked for the same time slot for the same date.
