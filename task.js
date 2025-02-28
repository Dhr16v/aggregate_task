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