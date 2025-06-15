Alfane, Myke Kieran
Sitchon, Aaron John
Dioso, Nick Gabriel
BS COMPUTER SCIENCE 3B

 
 Student Management System is a full-stack academic portal designed to demonstrate modern software architecture patterns:  

Admin Dashboard: MVC pattern (Node.js + Express + EJS) for user management with JWT authentication.  
Student Portal: MVVM pattern (React + MobX) for a reactive grade-viewing interface.  
Microservice: Isolated REST API (Node.js) for secure grade processing with Swagger documentation.  

Key Technical Achievements:  
Pattern Implementation: Clear separation of MVC (server) and MVVM (client) architectures  
Auth System: JWT with role-based access control (student/admin)  
API Design: Microservice with OpenAPI documentation  
Database: Dual-database setup (MySQL for admin, SQLite for microservice)  

Built as a final project for BSCS 3B, this system showcases production-grade practices including error logging, input validation, and CI/CD-ready structure.  


Setup Guide

Prerequisites:
- Node.js 18+
- MySQL 8.0+
- Git
- Python 3.8+ (for SQLite3 if needed)

1. Clone the repository:
git clone https://github.com/kieralfane22/github_final_proj
cd student-management-system

2. Database setup:
mysql -u root -p -e "CREATE DATABASE student_management;"

3. Configure environment:
cd server && cp .env.example .env
nano .env  # Edit with your MySQL credentials and JWT secret
cd ../microservice && cp .env.example .env
nano .env  # Set same JWT secret and port 3001

4. Install dependencies:
cd ../server && npm install
cd ../microservice && npm install
cd ../client && npm install

5. Initialize databases:
cd ../server
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

6. Run the system:
# Terminal 1:
cd server && npm start  # http://localhost:3000

# Terminal 2:
cd ../microservice && npm start  # http://localhost:3001

# Terminal 3:
cd ../client && npm start  # http://localhost:3002

Access:
- Admin: http://localhost:3000 (admin@school.edu/admin123)
- Student: http://localhost:3002 (student@school.edu/temp123)
- API Docs: http://localhost:3001/api-docs

Troubleshooting:
- MySQL errors: Verify server/.env credentials
- Port conflicts: Adjust PORT in .env files
- JWT issues: Match JWT_SECRET in both services