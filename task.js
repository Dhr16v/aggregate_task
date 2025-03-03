// 1.Find the number of tasks per user in a Tasks collection

[
    {
      $group: {
        _id: "$userId",
        TotalCount:{
          $sum:1
        }
        
      }
    }
  ]


// 2.Get the top 5 most recent completed tasks.

[
    {
      $match: {
        status:"Completed"
      }
    },{
      $sort: {
        completedAt: -1
      }
    },
    {
      $limit: 5
    }
  ]

// 3.Calculate the average time taken to complete tasks for each user
[
    {
      $match: {
        status:"Completed"
      }
    },{
      $project: {
        userId:1,
        timeTaken:{
          $subtract:['$completedAt','$createdAt']
        }
      }
    },{
      $group: {
        _id: "$userId",
        avgTime: {
          $avg: "$timeTaken"
        }
      }
    }
   ]

//4.Retrieve tasks along with user details (from Users collection).

[
    {
      $lookup: {
        from: "user_task",
        localField: "userId",
        foreignField: "_id",
        as: "userresult"
      }
    }
  ]

//5.Get all comments related to each task from a Comments array field

[
  {
    $project: {
      title:1,
      comments:1
    }
  }
]

//6.Find how many overdue tasks exist in the system

[
  {
    $match: {
      $and:[
        {
          status:{$ne:"Completed"}
        },{
          dueDate:{$lt:new ISODate()}
        }
      ]
    }
  }
 ]