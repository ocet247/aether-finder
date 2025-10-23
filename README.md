# Terraria Aether Biome Finder 

A simple app that calculates the position of Aether biome based on the name of first NPC in the World.

## Usage

Unlike other solutions this version can also be used on the secret seed worlds that alter the starting NPC.
This is only unapplicable for `celebrationmk10` and `getfixedboi` seeds as the starting set of NPCs have predefined name that does not depend on RNG value.

Classical way to use the computed value is to match your vertical position with the output by using the Compass and then dig down.

However it's not always the case that you have the Compass, especially if you aim to find the Shimmer early, instead you can opt for the second output value program produces:


Value indicates how far, either deeper into the ocean biome or away from it, should the player move after finding the edge of an ocean biome by using screen view as a metric.
The edge of the sand that generates on the beach isn't the most accurate indicator, as it's end can appear at multiple world position.
Instead, you can use the switch of a background / soundtrack to determine how far the ocean biome actually extents.
In case the evil biome generates besides the ocean, which can ruin the visual indicators you can resort to move approximately 10 blocks away from the beach sand.
This method assumed your half of your screen covers 60 blocks(you can check it by enabling ruler in-game and moving it to the very edge of your screen), which is the case for 1920x1080 resolution.
Efficient way to move a single screen is to memorise some terrain at the edge of your screen and move until you start seeing this patch of terrain on the opposite side of your screen.

On rare occassion Aether biome will not generate at the computed spot as it can't override evil biome blocks, meaning that it will end up in [Zone C](https://terraria.wiki.gg/wiki/The_Aether#Zones), but in that case the position cannot be predicted.
## How it works

The same RNG value that's used to generate Aether biome is involved into selecting the name of your starting NPC.
This RNG value is continuous with range of \[0, 1\] and every name behaves as a "bucket" that captures certain subrange of RNG value, distributed evenly.
The order of those "buckets" and their corresponding names matches with the order the names are defined in the localisation files.
This way it's possible to approximately trace back the RNG value by finding out the subrange of your starting NPC's name.

After the first NPC name has been given the RNG value changes so it's not possible to get the generational RNG afterwards.

## In Progress
Undetailed map that points out where you need to start digging and how many screens you need to move to make screen method of finding the correct location easier to visualise.
Possibility to alter the screen size and perhaps save it in cookies?
