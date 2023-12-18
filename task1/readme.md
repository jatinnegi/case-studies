# Database Design: Appointment Booking System

### Overview

Appointment booking system will allow different patients to book appointments with different doctors working in different clinics at different time slots.

---

### High Level Design

Following are the different tables we will need for our appointment booking system:

- **Doctors table:** to keep records of all doctors.
- **Clinics table:** to keep records of all clinics.
- **Patients table:** to keep records of all patients.
- **Time slots table:** to keep records of all available time slots.
- **DoctorsClinics table:** to describe a many to many relationship between doctors and clinics since different doctors can work at different clinics.
- **Appointments table:** to keep records of all available appointments.

---

### Low Level Design

Following is the detail implementation of each table specified in the previous section:
