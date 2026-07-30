# No-Gutter-Bowling

**No gutter bowling is a dynamic 2D smash and explode type bowling game built for players who are bored of standard bowling games and want to try something different. This game adds pins as enemies and the goal is to destroy the pins as long as the game doesn't break with obstacles and enemies.**

This game is quite different from the standard one lane bowling games because it employs different directions as the player can drag the ball back and release it to collide with walls and destroy the enemy pins. The player has the advantage of using the blast as well that destroys any obstacle or enemy in it's path, making it easier for the next round. There are a total of 2 rounds in one pattern and player has to try and get them all before the pattern switches.

**Controls:**

1. Player can spam the **spacebar** for explosions
2. Dragging and releasing the bowling ball will be the core movement for this game

<h1>Inspiration and challenges:</h1>

This game is inspired by drag and click games that people play on mobile and making the enemy patterns different every time was the primary challenge in making 
this game. Usually, indie devs would just drop in a library like Matter.js for collision detection. I wanted to do it myself. Coding the custom circle-rectangle collision math for the obstacles, and implementing the "hitstop" (freezing the game loop for a few milliseconds on impact) to make the enemy smashes actually feel punchy and weighty, was a tough but incredibly rewarding hurdle to overcome.

<h2>Theme: Indie Gamedev</h2>

I think the game suits this theme perfectly because it was built entirely from the ground up using raw web technologies without the crutch of an external game engine. It focuses purely on creating an addictive, and experimental gameplay loop and i was also thinking it could be a rival to the classic dino runner on chrome. It doesn't have a massive budget or a team of 50 people; it's just a fun game with endless replayability.
