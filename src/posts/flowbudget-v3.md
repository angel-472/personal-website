---
title: "FlowBudget V3 is out!"
creationDate: "2026-09-19"
excerpt: "On September 18 i finished implementation of all features and improvements for FlowBudget V3"
coverImageUrl: "/img/blog/flowbudget_v3.jpg"
categories: ["flowbudget", "javascript", "svelte", "supabase"]
published: true
---

FlowBudget V3 comes with two new sections: Savings Goals and Recurring Expenses.

 These new secitons turn FlowBudget into more than just an expense tracker. You can now visualize your recurring expenses and when they'll happen before you even plan any future transactions. You can also set savings goals and track your progress towards them.

There have also been many user experience improvements including but not limited to: Mobile navigation improvements, color contrast improvements and navigation routing. This also means refreshing the web app will get you back to exactly where you left off.

On mobile, FlowBudget works best installed to your home screen. It has full PWA support.

## Behind the build 

FlowBudget has been a personal app i've been working on for almost a year. It started as a simple one off project to solve a personal problem of mine. I was struggling to keep up with expense tracking using Apple Notes and having to recalculate things by hand.

Now in the present new needs have arisen and i took on the task of expanding the scope of this app. First i wanted to track my savings goals since i've been saving for separate things so tracking the amounts in once place would be very helpful.

I also knew that recurring expenses are a part of the budget that got really repetitive to track and sometimes you want to know when they'll come not just wait for the next transaction to happen. So i added a recurring expenses section to the app.

The most challenging feature to implement was the recurring expenses. I had to figure out the math behing how the ocurrences would be calculated and how to display them next to regular user created transactions. But my philosophy has been to **keep things simple** first. 

What i decided on was to use the category field. When a transaction is a recurring expense the category field shows it with a label in underlined red text. If the transaction is marked as completed or edited, it automatically gets converted to a regular transaction and that ocurrence is excluded so it never duplicates in the frontend.

As for the math i just took a piece of paper and first wrote down what value i wanted to know, prefferably in O(1) time complexity. Then i wrote down the variables i had available and how they could be used to get to the value i wanted. By breaking it down this way it was simple to figure out the logic and i noticed it wasn't as complicated as i thought it would be. 

I found this approach more straight forward than trying to bruteforce the solution by trying different code implementations. I will definitely use this approach in the future when working through the logic of different projects.

## Improving your skills in the age of AI

When implementing these new features i wanted to intentionally avoid heavy AI use. *Although i was a little less reserved when it came to using it for UX and design ideas*, i usually told it what i wanted and once it came up with a rough draft i would refine the design myself. I think the human in the loop is the most impportant part of the process as we build things for humans. 

Setting this intentions and following through allowed me to strengthen my skills and logic. I think this is a good approach to take when building software, especially when it comes to personal projects. 

If you are learning something new or getting back into coding do not let AI do all the work for you, it will only make you weaker in the long run. Let AI write things you fully understand and could write yourself, but don't let it do the thinking for you. Even then, do that with reservation.


[Try FlowBudget V3 →](https://flowbudget.pages.dev)
