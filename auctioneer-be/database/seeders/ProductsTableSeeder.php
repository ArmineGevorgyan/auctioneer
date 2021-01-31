<?php

namespace Database\Seeders;

use DB;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Travel Package',
            'desctiption' => "Fully paid trip to the major cities of Italy. Lorem ipsum posuere commodo cursus dictumst habitasse curae dolor commodo, sollicitudin vestibulum sed tempor integer feugiat vitae at aenean sapien ullamcorper nostra malesuada blandit, vehicula iaculis turpis feugiat aptent curabitur, class sapien laoreet sagittis.",
            'image' => 'https://handluggageonly.co.uk/wp-content/uploads/2018/02/Hand-Luggage-Only-8-5.jpg',
            'starting_price' => '2000',
            'current_price' => '2000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'The Arnolfini Portrait by Jan van Eyck',
            'desctiption' => "The Arnolfini Portrait is a 1434 oil painting on oak panel by the Early Netherlandish painter Jan van Eyck. It forms a full-length double portrait, believed to depict the Italian merchant Giovanni di Nicolao Arnolfini and his wife, presumably in their residence at the Flemish city of Bruges.",
            'image' => 'https://i.guim.co.uk/img/media/90c361caa6a48d2e45fe2204923c74c17866b835/0_31_3286_4430/master/3286.jpg?width=700&quality=85&auto=format&fit=max&s=9ee8c90d9827d5c17edc15889413f6ce',
            'starting_price' => '200000',
            'current_price' => '200000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Netherlandish 15th century Casket',
            'desctiption' => "Overall in good condition with some surface wear and dirt consistent with age. The locking mechanism is lost and there is a replacement plaque in its place, with glue residues. Some further uncarved sections may have been replaced. Wear to the gilding and paint throughout. A few very minor losses to some of the panels.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/9773c2a/2147483647/strip/true/crop/2000x1499+0+0/resize/1024x767!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F58%2Ff3%2Fe82e4e10457d8cbe4cdcc3381c0b%2F122n10613-9w6qp-01.jpg',
            'starting_price' => '3800',
            'current_price' => '3800',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Complete Slice Of Brenham Meteorite — An American Pallasite',
            'desctiption' => "Overall size 18.5 x 12.8 x 0.3 cm. The slice polished on both sides to reveal the dense concentration of translucent to transparent brownish yellow to yellow green olivine crystals within the highly lustrous nickel-iron. With custom lucite base.
            Associated with the Haviland crater in in Kiowa County, Kansas, the Brenham meteorite was “discovered” in 1882 by Eliza Kimberly, a local farmer, who collected numerous samples and convinced Professor F.W. Cragin of Washburn College in Kansas so come inspect them. The true discoverers of the the meteorites were the Native American peoples of the region, for whom the meteorites were the primary source of iron; jewelry fashioned from the meteorites has been found in Native American burial mounds as far away as Ohio. At only 50 feet in diameter, the Brenham Crater is one of the smallest impact craters in the world.
            The crystals seen here are the result of small chunks of the stony mantle becoming suspended in the molten metal of an asteroid’s iron-nickel core. Cut and polished, the lustrous metallic matrix features silicate crystals of gleaming olivine and peridot (gem-quality olivine) ranging in hues from emerald to amber. The metallic latticework in which the gemstones are set is referred to as a Widmanstätten pattern. It is the result of a slow cooling that provided sufficient time — millions of years — for the two metallic alloys to orient into their crystalline habit. As the only place where this can happen is in the vacuum of space (and also, theoretically at Earth’s own core-mantle boundary), the appearance of this pattern is diagnostic in the identification of a meteorite.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/dc15498/2147483647/strip/true/crop/2000x1999+0+0/resize/1024x1023!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fb6%2Fb7%2F9cb23b9b440a9e14c05a99425dd4%2F080n10612-bkxhx-2.jpg',
            'starting_price' => '4000',
            'current_price' => '4000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'A Fine Colombian Emerald',
            'desctiption' => "Overall size 6.0 x 5.8 x 3.7 cm. Sourced from the storied Muzo district of Colombia, this aesthetic specimen centers on a large emerald crystal with complex growth and pinacoid termination of saturated green color measuring 39.0 x 16.0 mm perched on light grey sharply crystalized calcite. With custom lucite base.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/237f7ee/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F09%2F3b%2F10ef3cea4d5da6a568c919504fb8%2F056n10612-bj8mb-1-noreserve.jpg',
            'starting_price' => '10000',
            'current_price' => '10000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'An Exquisite Pyrite',
            'desctiption' => "Iron Sulfide (FeS2), well known as the infamous “fool’s gold” and a prime commercial source of both sulfur and iron, is highly coveted by collectors intrigued by the lustrous, cubic and complex modified crystals that form both alone and in association with other minerals in rare conditions. Notable discoveries include Navajun, Spain and the Huanzala deposit in Peru, both very well represented in this collection.
            The extraordinary pyrite deposits of Navajun have been known and worked since at least 300 B.C. when the ancient local inhabitants prized the perfect golden cubes for their purported magical powers.",
            'image' => 'https://sothebys-md.brightspotcdn.com/93/d2/dc8432464babbe63b206a30b176a/168n10610-bjn66-noreserve.jpg',
            'starting_price' => '3500',
            'current_price' => '3500',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Alessandro Bonvicino, called Moretto da Brescia',
            'desctiption' => "Alessandro Ballarin was the first to correctly re-attribute this elegant Adoration to the young Moretto da Brescia. Ballarin has reconstructed the earliest activity of the artist, which centers around the commission of the organ doors depicting Saint Faustinus and Saint Jovita for the old cathedral of Brescia in 1515 (now in the church of Santa Maria in Valvendra in Lovere). 
            Moretto da Brescia was greatly inspired by fellow Brescian Girolamo Romani, called Romanino (circa 1485-1566), with whom scholars believe he traveled to Padua in 1513-1514. Moretto likely then went on to Venice, as many of his paintings from 1514-1515 (including the present example) bear the influence of the great Venetian painters working in the wake of Giorgione, including the young Titian and Palma Vecchio. The Adoration presented here can be dated to around 1515 and compared directly with the Madonna and Child now in the Pushkin Museum (inv. no. 106). Interestingly, the unique framing device of the beams of the shed within the composition reflect an understanding of the Northern Renaissance master Albrecht Dürer, though the central theme of the Holy Family derives more from Venetian influences.             
            1. Ballarin saw a photograph of the painting in the dealer Harry Solomon's office in Milan in 1989 with the Lutomirski provenance; it is not evident that the painting exchanged hands at that time as the consignor of the painting to the 2003 auction acquired it at the 1933 auction.",
            'image' => 'https://sothebys-md.brightspotcdn.com/72/59/1a2bfbd84e19a960e94d0a8b57d0/092n10608-7c4lw.jpg',
            'starting_price' => '150000',
            'current_price' => '150000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Rolex, Salmon Dial Datejust Reference 16200, A Stainless Steel Wristwatch with Date and Bracelet',
            'desctiption' => "The watch is in excellent condition and appears to be unpolished. There are light signs of use to the case. The dial and hands are in excellent condition. The bracelet is in very good condition with very light signs of use. The quick-set date is working at the time of cataloguing. The movement is working at the time of cataloguing.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/f04d225/2147483647/strip/true/crop/3807x3807+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fc1%2F01%2F7edebfb74fa18b499e3f1526c9dc%2Fmrkt-rolex-salmondatejust-front.png',
            'starting_price' => '5500',
            'current_price' => '5500',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Hermès, Braise Shiny Alligator Mississippiensis Birkin 35cm Gold Hardware',
            'desctiption' => "Hermès Braise Birkin 35cm in Shiny Alligator Mississippiensis with Gold Hardware, 2000
            Includes clochette, lock, key, dustbag and box.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/cd5d70c/2147483647/strip/true/crop/1152x1152+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F0c%2F9e%2Fd2175f074f0dad79d55a2b527b26%2F001n10490-bq5r3-01.jpg',
            'starting_price' => '25000',
            'current_price' => '25000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'GOSHWARA, Pair of Opal and Diamond Pendant Earclips',
            'desctiption' => "Of pendant design, featuring drop-shaped and round opal cabochons, framed and accented with round diamonds.
            Opals weighing a total of approximately 12.90 carats.
            Diamonds weighing a total of approximately 3.00 carats.
            Length 1¾ inches.
            Signed Goshwara.
            18 karat gold.
            Fitted with posts.",
            'image' => 'https://sothebys-md.brightspotcdn.com/af/eb/1163d9f5458f93e88dadc3ee5cab/yt-je0305-op-y.jpg',
            'starting_price' => '7650',
            'current_price' => '7650',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Yellow Sapphire and Diamond Ring',
            'desctiption' => "Centering an oval yellow sapphire flanked by 2 tapered baguette diamonds.
            Yellow sapphire weighing 15.73 carats.
            Diamonds weighing a total of approximately 3.10 carats.
            Size 6.
            Platinum and 18 karat gold.
            Accompanied by GIA report 1107077812 stating that the yellow sapphire is Natural Color, with no indications of heating.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/12b0307/2147483647/strip/true/crop/4537x4537+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F8e%2F75%2Fcbb0b54b42a9bf32552435178577%2Fkd-sr2050-front.jpg',
            'starting_price' => '21000',
            'current_price' => '21000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Northern French, possibly Lorraine, mid 14th century',
            'desctiption' => "Virgin and Child
            limestone, with remains of polychromy
            height 47 1/4 in.; 120cm.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/ea799e4/2147483647/strip/true/crop/792x2000+0+0/resize/1024x2586!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F5b%2F59%2Fcc1102aa4f06b537725ac104ed16%2F066n10613-bp55g-01.jpg',
            'starting_price' => '30000',
            'current_price' => '30000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Francesco Bertos (Venice 1678 - 1741) Venice, 18th century',
            'desctiption' => "pair of allegorical groups: Carrying off Fame and Folly Supporting Spring
            bronze, on waisted marble socles
            The pose of the male figure holding the nude female aloft is a familiar motif in Bertos's allegorical groups and certainly derives from Giambologna's Rape of the Sabines. The second bronze of this pair shares the same composition with the Bertos group of Industry and Virtue in the J. Paul Getty Museum. Another pair, probably forming a set of four with the Getty pair, were sold in these rooms in sale of The Arthur Sackler Estate, 29 January 2010 lot 482.
            Although the attributes here are somewhat ambiguous, which is not uncommon in Bertos' work, one female figure holds a trumpet (which represents Fame) and the other has a wreath of leaves on her head and holds plants in her hands, which could be associated with Spring.",
            'image' => 'https://sothebys-md.brightspotcdn.com/b3/d5/e031863b4d9582b61dbec6b4db60/059n10613-97rjf-01.jpg',
            'starting_price' => '38000',
            'current_price' => '38000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Universal Genève, STAINLESS STEEL TRIPLE CALENDAR CHRONOGRAPH WRISTWATCH WITH MOON PHASES',
            'desctiption' => "Case: The case is in overall good condition with wear commensurate with age. Please note that the strap and buckle are generic and not signed Universal Geneve.
            Dial: The dial is in overall good condition. Partial loss to the luminous material on all the plots. Some wear and age to the hands.           
            Movement: Triple calendar function operating. The movement is running at time of cataloging, however it was not tested for the accuracy of time or duration of the power reserve and may need service at the buyer's discretion. Please note that Sotheby's does not guarantee the future working of the movement.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/69173f5/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F57%2F02%2Ff79ef6344bb4b8e9bd9677a5b727%2Fn10843-bk2bj-36-1.jpg',
            'starting_price' => '17000',
            'current_price' => '17000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Beastie Boys',
            'desctiption' => 'Gold Sales award presented to Mike D for the Beastie Boys 1999 anthology album “The Sounds of Science" for more 100,000 copies sold in the United Kingdom.',
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/fafdc71/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F06%2F11%2F06a4728248d887740195189815f5%2F132n10612-bnkx6-01-noreserve.jpg',
            'starting_price' => '1500',
            'current_price' => '1500',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Rolex, REFERENCE 4099 A STAINLESS STEEL AND PINK GOLD CHRONOGRAPH WRISTWATCH WITH FLARED LUGS',
            'desctiption' => "Case: The case is in overall good condition with wear commensurate with age. Please note that the strap and buckle are generic and not signed Universal Geneve.
            Dial: The dial is in overall good condition. Partial loss to the luminous material on all the plots. Some wear and age to the hands.           
            Movement: Triple calendar function operating. The movement is running at time of cataloging, however it was not tested for the accuracy of time or duration of the power reserve and may need service at the buyer's discretion. Please note that Sotheby's does not guarantee the future working of the movement.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/3349d37/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F7d%2Fc1%2F8d2a066a462a8bc9121024291672%2Fn10843-bk2bh-35-1.jpg',
            'starting_price' => '18000',
            'current_price' => '18000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Brendan Murphy, Boonji Spaceman',
            'desctiption' => "Brendan Murphy is an internationally acclaimed American painter, creative entrepreneur, former professional athlete, and founder of athletic clothing company Solfire. Murphy has traveled the world, laying roots in business, athletics, and creativity all along the way.
            Since his early career, Brendan has blended abstract and figurative forms to reveal meaning with deeper contemplations through his sculpture and painting. His sculptural work communicates a rare perspective on the modern human experience through explorations of form, color, language, and universal symbols. Thematically, Murphy explores the interplay of beauty, power and the need to understand the source of all the energies of life. His commitment to process and true craftsmanship is the unifying thread throughout his body of work.
            Over the last ten years, Murphy has produced over 60 gallery exhibitions, including an annual appearance at Miami’s Art Basel. Murphy’s work can be seen at the 143 Gallery in Williamsburg, Brooklyn and can be found in over 600 collections all over the world.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/25cde28/2147483647/strip/true/crop/3024x4032+0+0/resize/1024x1365!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fd4%2Fd0%2F11fb0e464c128ba0a9c2e1b35ef0%2Fmurphy-brendan-image-a.jpg',
            'starting_price' => '170000',
            'current_price' => '170000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'A Beijing Enamel \'Ruby Landscape\' Snuff Bottle Mark and Period of Jiaqing',
            'desctiption' => "Enamel snuff with bottles produced within the Zaobanchu (Imperial Household Department) in the Jiaqing period and enamelled with a Jiaqing reign mark are extremely rare. Only one other example appears to be recorded, an enamel snuff bottle with similarly articulated four-character kaishu mark, decorated with foreigners bearing tributes from the Qing court collection and still in Beijing, illustrated in Snuff Bottles. The Complete Collection of Treasures of the Palace Museum, Hong Kong, 2003, pl. 177.
            The exquisitely rendered puce enamel scenes on the current bottle may be attributed to the influences of European enamelled pieces which were imported to the Court, often as a tribute to the Emperor. The style of painting on the bottle is also closely related to the 18th century prints and engravings from Europe, especially in the stippling effects to produce shading and differentiation of depth and form in the landscapes. Prints of such idealised landscapes populated with small figures began to be produced in France around 1750. The use in Europe of puce as the monochrome colour against white in enamels on copper seems to have developed much later than on porcelain, often depicting chinoiserie scenes within raised gilt rococo frames. These can usually be dated to after 1750.            
            By the reign of the Qianlong Emperor, enamellers at the palace workshops had mastered the manufacture and painting of fine overglaze enamels. The finest quality puce enamelled landscapes were found on ceramics, glass and copper wares with Qianlong marks, and appear to have been made at the imperial ateliers during his reign. For Qianlong prototypes of the current bottle, compare an example from the Qing court collection and still in Beijing, illustrated in Snuff Bottles. The Complete Collection of Treasures of the Palace Museum, Hong Kong, 2003, pl. 174, and another sold at Christie’s Hong Kong, 25th April 2004, lot 837, from the J&J Collection.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/f6615be/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F8d%2F50%2Ff6e45cd043caa7d0657e7bf3094a%2Fhk1108-bqnbw-1.jpg',
            'starting_price' => '80000',
            'current_price' => '80000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Schorl Tourmaline with Quartz and Albite',
            'desctiption' => "Overall size 15.0 x 13.0 x 11.0 cm. Centering on a central lustrous black schorl partially encased within the surround of stark white albite accented with sharply terminated colorless quartz and associated lepidolite books. With custom lucite base.
            While Silicon Oxide (SiO2) or quartz may be the second most common mineral present in the Earth’s crust, many rare and unusual varieties offer opportunities for collectors. From the royal purple and golden hues of amethyst and citrine, to the intense turquoise and apple green of chrysocolla and chrysoprase, quartz has an incredible spectrum of available colors. Rare and unusual crystal forms such as scepters, gwindels, faden, elestial and “spirit” quartzes create incredibly diverse aesthetics to enjoy. As a prime component within many of the great crystalline environments, quartz is also a frequent partner to and basis for other mineral growth. Classic combinations like smoky quartz and amazonite, fluorite on quartz, and spessartine garnet on smoky quartz offer fantastic contrasts of color and form.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/db8ed8d/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F09%2Fc0%2F9faeb4b040858e14aeddf3352119%2F098n10612-bjn6b-01-noreserve.jpg',
            'starting_price' => '4000',
            'current_price' => '4000',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'French Belle Époque Figural Centerpiece',
            'desctiption' => "Hand-knotted geometric rug from the Mid-Century Modern collection.
            Off-white and bold black hues accent the beige-brown design against a rich brown ground.
            Constructed of wool, natural silk and exotic yarns.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/ae036df/2147483647/strip/true/crop/1200x1200+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F5b%2F72%2F2691d11b49888b54dac9805c3de2%2Fatsltlsi-rwfwzdzjls.png',
            'starting_price' => '6600',
            'current_price' => '6600',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);

        DB::table('products')->insert([
            'name' => 'Rug & Kilim, Hand-Knotted Geometric Rug ',
            'desctiption' => "Terracotta centerpiece featuring three standing putti.
            Hand-carved rouge marble bowl.
            Round marble base.
            Indistinguishable signature.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/312a0af/2147483647/strip/true/crop/1200x1200+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fce%2Ff0%2F71d50ec74f49875fcc44b3fbc44d%2Fbsb3h-front.png',
            'starting_price' => '2700',
            'current_price' => '2700',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);
        
        DB::table('products')->insert([
            'name' => 'A selection of books on Donatello',
            'desctiption' => "Sgarbi, Vittorio. Donatello e il suo tempo: Il bronzetto a Padova nel Quattrocento e nel Cinquecento. Publisher, Year. 
            Christiansen, Keith. The Renaissance Portrait from Donatello to Bellini. The Metropolitan Museum of Art, 2001. 
            Avery, Charles. Florentine Renaissance Sculpture. John Murray, 1989. 
            Bormand, Marc, and Beatrice Paolozzi Strozzi. Le Printemps de la Renaissance : La sculpture et les arts à Florence 1400-1460. Officina Libraria, 2013. 
            Pope-Hennessy, John. The Study and Criticism of Italian Sculpture. Metropolitan Museum of Art, 1981. 
            Pope-Hennessy, John. Donatello. Abbeville Press, 1993. 
            Poeschke, Joachim. Donatello and His World: Sculpture of the Italian Renaissance. Harry N Abrams, 1993. 
            Rosenauer, Artur. Italian Renaissance Sculpture in the Time of Donatello. Founders Society Detroit Inst, 1985. 
            Cavazzini, Laura. Grandi Scultori Donatello. Gruppo Editoriale L’Espresso, 2005. 
            Bennett, Bonnie A. & David G. Wilkins. Donatello. Moyer Bell Limited, 1984. 
            Paolozzi, Beatrice. The Springtime of the Renaissance: Sculptors and the Arts in Florence 1400-60. Mandragora. 2013 
            Butterfield, ed. Andrew. Donatello in Motion: A Spiritello Rediscovered. Publisher, Year. 
            Tostmann, Oliver, and Michael Cole. Donatello, Michelangelo, Cellini: Sculptors' Drawings from Renaissance Italy. Paul Holberton Publishing, 2014. 
            Caglioti, Francesco. Donatello e i Medici. Olschki, 2000. 
            Italian Renaissance Sculpture in the Time of Donatello. Detroit Institute of Arts, 1985. 
            Phipps Darr, Alan & Giorgio Bonsanti. Donatello E I Suoi: Scultura Fiorentina del Primo Rinascimento. Arnoldo Mondadori Editore, 1986. 
            Verdon, Timothy. Sculpture in the Age of Donatello: Renaissance Masterpieces from Florence Cathedral. D Giles Limited, 2015.",
            'image' => 'https://sothebys-md.brightspotcdn.com/dims4/default/71a4fe8/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F07%2F93%2F6b9ce43c4a92a1ba6e265024ceba%2F159n10612-bn62s-01-noreserve.jpg',
            'starting_price' => '900',
            'current_price' => '900',
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subHours(rand(0, 24))->subMinutes(rand(0, 60)),
        ]);
    }
}
