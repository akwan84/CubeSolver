# Cube Solver
## Introduction
This is a program that can solve a 2x2 Rubik's cube.

## How to Use
On the bottom panel, there are 6 colours, you start off by selecting one of these colours, then click on any of the 24 stickers on the cube to paint it to the selected colour. 

By default, the orientation of the sides should be:
<ul>
    <li>White - Top</li>
    <li>Orange - Left</li>
    <li>Green - Front</li>
    <li>Red - Right</li>
    <li>Blue - Back</li>
    <li>Yellow - Bottom</li>
</ul>
So keep this orientation in mind when inputing colours.  

Once all the colours have been inputted, click the solve button. The underlying algorithm for the solver is Breadth-First Search, which means the solver will find the shortest solution, but is doing an exhaustive search to do so. From research, a 2x2 cube can always be solved in a maximum of 11 moves, and with a BFS branching factor of 6, the search tree can get very large, leading to solve times of sometimes upwards of 30 seconds.  

But once a solution is found, it will be displayed.

## Solution Notation
There could be up to 9 possible types of moves the solution will contains:
<ul>
    <li>U - Top side clockwise 90 degrees</li>
    <li>U' - Top side counterclockwise 90 degrees</li>
    <li>U2 - Top side 180 degrees</li>
    <li>F - Front side clockwise 90 degrees</li>
    <li>F' - Front side counterclockwise 90 degrees</li>
    <li>F2 - Front side 180 degrees</li>
    <li>R - Right side clockwise 90 degrees</li>
    <li>R' - Right side counterclockwise 90 degrees</li>
    <li>R2 - Right side 180 degrees</li>
</ul>

## Shortcomings
### Long Solve Time
It only takes me roughly 10 seconds to solve a 2x2 cube, so having to take minutes to input the colours and wait for the solver to find a solution can be inconvenient. The solver can be sped up using some kind of heuristic to estimate a lower bound of the number of moves the cube is from solved.

### Invalid Cube Entry
The other problem comes with cube input where the user can input an invalid cube, which will prevent my solver from finding a solution. A simple check that can be implemented is to see whether there is 4 of each colour. But there are many other nuances specific to a Rubik's cube, like how it is not possible to twist 1 corner, which is a much harder condition to check for.