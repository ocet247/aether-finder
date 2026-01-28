# Terraria Aether Biome Finder

A simple app that calculates the position of Aether biome based on the name of first NPC in the world.

## Usage

Unlike other solutions this version can also be used on the secret seed worlds that alter the starting NPC and does not
solely rely on the Guide. This includes seeds such as `fortheworthy`, `05162020` and `dontdigup`.
This is only unapplicable for `celebrationmk10` and `getfixedboi` seeds as the starting set of NPCs have predefined names
which cannot be used to infer the RNG value.

The only output of other solutions is the horizontal position of the Aether Biome, which requires you to have the Compass.
There's a possibility that the user might not have it especially if they aim to find the Shimmer early, instead you can
opt for the second output value program produces, that can be interpreted in a following way:

This value indicates how far, either deeper into the ocean biome or away from it, should the user move after finding the
edge of an ocean biome by using their screen viewport as a metric.
You can use the switch of a background / soundtrack to determine how far the ocean biome extents, but in case where evil
biome generates besides the ocean and overrides the visual indicators, the user can resort to move approximately 10 blocks
away from the sand on the beach. This method assumes that half of user's screen covers 60 blocks (the way to check it is
by enabling ruler in-game and moving it to the very edge of the screen), which is the case for 1920x1080 resolution.
Efficient way to move a single screen is to memorise some patch terrain at the edge of the screen and move until you start
seeing this patch of terrain on the opposite side of the screen. (e.g. finding a rock at the left edge of the screen and
moving to the left up until the point where this rock is visible at the right edge of the screen.)

Rarely Aether biome will not generate at the computed spot as it can't override evil biome blocks, meaning that it will end
up in [Zone C](https://terraria.wiki.gg/wiki/The_Aether#Zones), but in that case the position cannot be inferred.

## How it works

Game generates the world by certain amount of passes, for our purposes 2 passes are in interest: the one that generates
the Aether and the one that assigns starting NPC name.
Each pass has a separate pseudorandom number generator tied to it, the quirk here is that each one of them is getting
fed the same 'seed', making the sequence identical.
The pass that generates the Aether takes 2nd value from the sequence which matches with the pass that assigns the
starting NPC's name.
In practice this means that both passes use the same RNG value, which makes it possible to infer one from the other.

While determining the name of your starting NPC based on location of Aether isn't particulary useful, the reverse is
quite helpful and is essentially what's being used here.
This RNG value is continuous with range of \[0, 1\] and every name behaves as a "bucket" that captures certain subrange
of the RNG value, distributed evenly.
The order of those "buckets" and their corresponding names matches the order in which the names are defined in the
localisation files.
This way it's possible to approximately trace back the RNG value by finding out the interval of your starting NPC's
name.

Once the starting NPC name has been assigned, the game no longer uses the generational RNG value to determine NPC names,
making it impossible to recover your generational RNG afterwards.
Remember to save the name in case your NPC dies.

## In Progress

Simple map that points out where you need to start digging and how many screens you need to move to make screen
method of finding the correct location easier to visualise.
Possibility to alter the screen size?
