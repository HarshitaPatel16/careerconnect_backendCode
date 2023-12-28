# nexumbackend


**Database Information**
Name - root
Password - kmjn#?-4yg_U

**Server Information**
Port - 9467


**For dump new sql file**
1. Add the dumb.sql file in the /home/ec2-user
2. Open Terminal
3. Write the following command - sudo mysql -u root -p [databasenamme] < dumb.sql
Reference Link - https://world.siteground.com/kb/exportimport-mysql-database-via-ssh/

**For Creating new pm2 for your server**
1. Goto server path
2. Open Terminal
3. use this -  pm2 start npm --name "app.js" -- start
4. then pm2 logs
Reference Link - https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script

