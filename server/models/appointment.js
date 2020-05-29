const connection = require("../lib/connection.js");
const {dbName} = require("../lib/connection.js");

var Appointment = function (params) {
  this.fdbName = params.fdbName;
  this.userId = params.userId;
  this.appointmentId = params.appointmentId;
  this.appointment_status = params.appointment_status;

  this.meeting_time = params.meeting_time;
  this.date = params.date;
  this.start_time = params.start_time;
  this.end_time = params.end_time;
  this.operation = params.operation;

  this.first_name = params.first_name;
  this.last_name = params.last_name;
  this.contact = params.contact;
  this.reference = params.reference;

  
  this.roleId = params.roleId;
  this.franchiseId = params.franchiseId;
};



Appointment.prototype.getCurrentTimeslot = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      connection.query('SELECT at.id, at.franchise_id, at.user_id, DATE_FORMAT(at.date,\'%Y-%m-%d\') as date, at.meeting_time, TIME_FORMAT(at.start_time, \'%H:%i\') as start_time, TIME_FORMAT(at.end_time, \'%H:%i\') as end_time,  at.status, (CASE at.status WHEN 1 THEN "Available" WHEN 2 THEN "On Leave" END) as status_name, at.is_active FROM `appointment_timeslot` AS at WHERE at.user_id = "'+ that.userId +'" AND at.franchise_id = "'+ that.franchiseId +'" AND at.is_active = 1 AND at.status IN (1,2) ORDER BY at.date, at.id', function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);        
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}



Appointment.prototype.getAppointedClientList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      let Query = `SELECT ar.user_id, ar.meeting_time, ar.date as appointment_date, TIME_FORMAT(ar.start_time, \'%H:%i\') as start_time, TIME_FORMAT(ar.end_time, \'%H:%i\') as end_time, ar.is_active, ac.first_name, ac.last_name, ac.contact, ac.reference FROM appointment_record as ar INNER JOIN appointed_client as ac ON ar.id = ac.appointment_id WHERE ar.date = '${that.date}' AND ar.user_id = ${that.userId} AND ar.franchise_id = ${that.franchiseId} ORDER BY ar.start_time`;
      // console.log(Query)
      connection.query(Query , function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);        
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}


Appointment.prototype.addNewTimeslot = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      const Values = [
        [that.franchiseId, that.userId, that.date, '15', that.start_time, that.end_time, 1, 1]
      ];
      
      connection.query('INSERT INTO appointment_timeslot(franchise_id, user_id, date, meeting_time, start_time, end_time, status, is_active) VALUES ?', [Values], function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);
      });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}

Appointment.prototype.updateExistingTimeslot = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      const Values =  [that.date, that.start_time, that.end_time, that.userId, that.franchiseId, that.appointmentId] ;
      
      connection.query('UPDATE appointment_timeslot SET date = ?, start_time = ?, end_time = ? WHERE user_id = ? AND franchise_id = ? AND id = ?', Values, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);        
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}



Appointment.prototype.handleLeave = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      connection.query('UPDATE appointment_timeslot SET status = '+ that.appointment_status +' WHERE user_id = '+ that.userId +' AND date = "'+ that.date +'" AND franchise_id = "'+that.franchiseId+'" AND status != 3', function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);       
      });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}


Appointment.prototype.removeTimeSlot = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database :dbName});
      connection.query('UPDATE appointment_timeslot SET status = 3 WHERE user_id = '+ that.userId +' AND franchise_id = '+that.franchiseId+' AND id = '+ that.appointmentId +'', function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);       
      });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}



Appointment.prototype.fetchBookedAppointmentList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      
        connection.changeUser({database : dbName});
        connection.query('SELECT ar.id, ar.franchise_id, ar.user_id, DATE_FORMAT(ar.date,\'%Y-%m-%d\') as date, ar.meeting_time, TIME_FORMAT(ar.start_time, \'%H:%i\') as start_time, TIME_FORMAT(ar.end_time, \'%H:%i\') as end_time,  ar.status,  ar.is_active, ac.first_name, ac.last_name, ac.contact, ac.reference FROM `appointment_record` AS ar LEFT JOIN `appointed_client` as ac ON ar.id = ac.appointment_id WHERE ar.user_id = "'+ that.userId +'" AND ar.franchise_id = "'+ that.franchiseId +'" AND ar.date = "'+ that.date +'" AND ar.is_active = 1 ORDER BY ar.date, ar.id', function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  }
        resolve(rows);        
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}



// Appointment.prototype.getRoleList = function () {
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
      
//       connection.changeUser({database : dbName});
//       //console.log()
//       connection.query('SELECT * FROM role WHERE id NOT IN(1,2)', function (error, rows, fields) { 
//         if (error) {  console.log("Error...", error); reject(error);  }
          
//         resolve(rows);              
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }


// Appointment.prototype.fetchFranchiseList = function () {
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
      
//       connection.changeUser({database : dbName});
//       connection.query('select * from franchise', function (error, rows, fields) { 
//         if (error) {  console.log("Error...", error); reject(error);  }
          
//         resolve(rows);              
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }




// Appointment.prototype.fetchStaffList = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
      
//       connection.changeUser({database : that.fdbName});
//       let query = '';
//       query = 'select (SELECT franchise_id FROM user WHERE id = 1)  as franchise_id, u.id, u.name, u.role_id, s.email, s.contact from user as u INNER JOIN staff as s ON u.id = s.franchise_user_id WHERE  u.is_active = 1 AND status = 1 AND u.role_id LIKE "%'+that.roleId+'%"';

//       connection.query(query, function (error, rows, fields) {
//         if (error) {  console.log("Error...", error); reject(error);  }
//         console.log(rows)
//         resolve(rows);
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }




// Appointment.prototype.inActiveDueDatedTimeslot = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       connection.changeUser({database :dbName});
//       connection.query('UPDATE appointment_timeslot SET is_active = 0 where date < CURRENT_DATE AND franchise_id = "'+that.franchiseId+'" ', function (error, rows, fields) {        
//         if (error) {  console.log("Error...", error); reject(error);  }
//         resolve(rows);                
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }


// Appointment.prototype.createTimeslot = function (franchiseId, userId, date, meeting_time, start_time, end_time, status, is_active) {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       connection.changeUser({database :dbName});
//       const Values = [franchiseId, userId, date, meeting_time, start_time, end_time, status, is_active, userId, date, franchiseId];
//       // console.log(Values);
//       connection.query('INSERT INTO appointment_timeslot(franchise_id, user_id, date, meeting_time, start_time, end_time, status, is_active) SELECT ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM appointment_timeslot WHERE user_id = ? AND date = ? AND franchise_id = ? AND is_active = 1 );', Values, function (error, rows, fields) {
//         if (error) {  console.log("Error...", error); reject(error);  }          
//         resolve(rows);
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }

// Appointment.prototype.bookAppointment = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       connection.changeUser({database :dbName});
      
//       const Values =  [
//         [that.franchiseId, that.userId, that.date, that.meeting_time, that.start_time, that.end_time, 1, 1] 
//       ];

//       connection.query('INSERT INTO appointment_record (franchise_id, user_id, date, meeting_time, start_time, end_time, status, is_active) VALUES ?', [Values], function (error, rows, fields) {
//         if (error) {  console.log("Error...", error); reject(error);  } 
        
//         const ClientData = [
//           [that.franchiseId, rows.insertId, that.userId, that.first_name, that.last_name, that.contact, that.reference, 1, 1]
//         ];
//         connection.query('INSERT INTO appointed_client (franchise_id, appointment_id, user_id, first_name, last_name, contact, reference, status, is_active) VALUES ?', [ClientData], function (error, rows, fields) {
//           if (error) {  console.log("Error...", error); reject(error);  } 
//           resolve(rows);
//         });  
//       });
//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//     });
//   });
// }



module.exports = Appointment;