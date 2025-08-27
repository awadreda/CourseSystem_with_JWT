import { Avatar, Badge, Card, CardContent } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

// TODO: Replace this mock data with actual data fetching or props as needed
const studentData = {
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Student",
  },
  gpa: 3.8,
  courses: [
    {
      courseID: "CSE101",
      title: "Introduction to Computer Science",
      credits: 3,
      description: "Learn the basics of computer science.",
      teacher: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice.smith@example.com",
        },
      },
    },
    {
      courseID: "CSE101",
      title: "Introduction to Computer Science",
      credits: 3,
      description: "Learn the basics of computer science.",
      teacher: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice.smith@example.com",
        },
      },
    },
    {
      courseID: "CSE101",
      title: "Introduction to Computer Science",
      credits: 3,
      description: "Learn the basics of computer science.",
      teacher: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice.smith@example.com",
        },
      },
    },
    {
      courseID: "CSE101",
      title: "Introduction to Computer Science",
      credits: 3,
      description: "Learn the basics of computer science.",
      teacher: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice.smith@example.com",
        },
      },
    },
    // Add more courses as needed
  ],
};

const StudentDashboard = () => {
  const { user, gpa, courses } = studentData;

  return (
    <div className="p-6 bg-black space-y-6">
      <Card className="shadow-xl bg-blue-600">
        <CardContent  className="p-6 bg-">
        <Avatar sizes="large" sx={{ bgcolor: deepPurple[500] }}>{user.firstName[0]}</Avatar>

          <h2 className="text-2xl font-bold mb-2">
            Welcome, {user.firstName} {user.lastName}
          </h2>
          <p className="text-muted-foreground">Email: {user.email}</p>
          <p className="text-muted-foreground">Role: {user.role}</p>
          <p className="text-muted-foreground">GPA: {gpa}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.courseID} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <Badge>{course.credits} Credits</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="border-t pt-2 text-sm">
                <p className="font-medium">Teacher:</p>
                <p>{course.teacher.user.firstName} {course.teacher.user.lastName}</p>
                <p className="text-muted-foreground text-xs">
                  {course.teacher.user.email}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;