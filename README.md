# Classic Arcade Game Clone by Tice Kralt

## How to play

By moving the player across the field try to reach the water without getting hit by the evil bugs! When you reach the water you gain 1 point. Try to get as many points as possible! But watch out: the higher your score, the harder it will get...

## Setup

1. The game is made using HTML Canvas
2. In engine.js the canvas gets drawn and the looping function gets requested in the function main().
3. When main() runs it first updates the entities and creates a time delta so that the bug's pace is the same for each computer (see Enemy.speed in app.js).
4. The second function is a render function that redraws the canvas for us so that the animation can run.
5. The update() and render() functions each call the update() and render() methods respectively from the two classes: Enemy and Player

## Properties
- This project is part of the Udacity course of _Web Development_.
- The canvas has a 5X5 grid layout that gets drawn in engine.js
- Part of the project has been made by the people at Udacity, like the initial HTML body, resources.js and engine.js
- I programmed most of the app.js content, including the classes and functions

## Licence

Audio:
["hurt2.wav"](https://freesound.org/people/thecheeseman/sounds/44429/) by thecheeseman is licensed under [Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/legalcode)

["Collect_Point_01.wav"](https://freesound.org/people/thecheeseman/sounds/44429/) by LittleRobotSoundFactory is licensed under [Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/legalcode)

## Features that might be added in the future

- An intro screen with:
  - A player selector
  - A short explanation of the game
- Coins on the canvas so you can get even more points
- Hearts on the canvas so you can get a life back
