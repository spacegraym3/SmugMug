
var page_1 = '<div class="pageLeft" style="background-color:white">' +
                '<img src="childrens_books/images/assets/page_blank.jpg" height="528px" />' + 
            '</div>' +
            '<div class="pageRight">' +
                '<div> <img src="childrens_books/images/bookTitle.jpg" alt="Goofy Goes to the Doctor" /> </div>' +
                '<div> <img src="childrens_books/images/bookCover.gif" style="position:absolute; top:180px; left:50px" alt="book cover" /> </div>' +
                '<div class="text" style="position:absolute; top:409px; left:131px">By Susan Amerikaner<br />Illustrated by Loter, Inc.</div>' +
                '<div style="position:absolute; bottom:0"><img src="childrens_books/images/imgDisneyPress.jpg" alt="Disney Press" /> </div>' +
                '<div class="text" style="position:absolute; top:470px; left:215px"> New York </div>' +
            '</div>';
            
var page_2 = '<div class="pageLeft">' +
                '<div> <img src="childrens_books/images/page_twoA.jpg" alt="page two" /> </div>' +
                '<div id="page1" class="clickText">' +
                    '<p>Mickey woke up early and checked the date. Yep. Today Goofy was supposed to go to the doctor for a checkup. This afternoon Mickey would drive Goofy to his appointment.</p>' +
                    '<p>Ding-dong!</p>' +
                    '<p>Who was ringing the Mousekedoorbell?</p>' +
                '</div>' +
                '<div class="pageRight">' +
                    '<div> <img src="childrens_books/images/page_twoB.jpg" alt="page two" /> </div>' +
                '</div>' +
            '</div>';
                
var page_3 = '<div class="pageLeft">' +
                '<div> <img src="childrens_books/images/page_threeA.jpg" alt="page three" /> </div>' +
                '<div id="page2" class="clickText">' +
                    '<p>It was Goofy the Great!</p>' +
                    '<p>Mickey yawned and said, “Goof, you’re early!”</p>' +
                    '<p>“Early for what?” replied Goofy.</p>' +
                    '<p>“Aw,” said Mickey. “Did you forget that your checkup with <br />the doctor is this afternoon?</p>' +
                '</div>' +
                '<div class="pageRight">' +
                    '<div class="hotspot" style="position:absolute; top:305px; left:20px; height:115px; width:125px"></div>' +
                    '<div><img src="childrens_books/images/page_threeB.jpg" swap="childrens_books/images/page_threeB_ani.jpg" /></div>' +
                '</div>' +
            '</div>';
/*
            <div id='page_4'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_fourA.jpg" alt="page four" /> </div>
                    <div id="page3A" class="clickText">
                        <p>“Garwsh. I did forget,” said Goofy. “I came to show you some new magic tricks. But now that you reminded me about the 
                            <br /> doctor, I’m gonna show you one of my greatest tricks ever. <br />Hokeypokey!”</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_fourB.jpg" alt="page four" /> </div>
                    <div id="page3B" class="clickText">
                        <p>Goofy the Great disappeared!</p>
                        <p>That was a good trick.</p>
                        <p>Mickey called, “Goof, where are you?”</p>
                    </div>
                </div>
            </div>
            <div id='page_5'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_fiveA.jpg" alt="page five" /> </div>
                    <div id="page4" class="clickText">
                        <p>Pluto pointed to a clue.<p>
                        <p>“The Silly Switch!” said Mickey. “Good job, Pluto!”</p>
                        <p>Goofy had pulled the Silly Switch to disappear. </p>
                        <p>“Let’s pull it again and see where he went,” said Mickey.</p>
                    </div>
                </div>
                <div class="pageRight">
				    <div class="hotspot" style="position:absolute; top:80px; left:25px; height:275px; width:205px;"></div>
                    <div> <img src="childrens_books/images/page_fiveB.jpg" swap="childrens_books/images/page_fiveB_ani.png" /> </div>
                </div>
            </div>
            <div id='page_6'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_sixA.jpg" alt="page six" /> </div>
                    <div id="page5" class="clickText">
                        <p>They found Goofy. He was at the Moo Mart—inside a barrel of apples!</p>
                        <p>“What are you doing in there, Goof?” asked Mickey.</p>
                        <p>“An apple a day keeps the doctor away,” said Goofy. “So if <br />I eat this whole barrel, I’ll never have to go to the doctor!”</p>
                        <p>“That’s udderly ridiculous,” said Clarabelle.</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_sixB.jpg" alt="page four" /> </div>
                </div>
            </div>
            <div id='page_7'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_sevenA.jpg" alt="page seven" /> </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_sevenB.jpg" alt="page four" /> </div>
                    <div id="page6" class="clickText">
                         <p>Goofy and Mickey went back to the Clubhouse. </p>
                         <p>Daisy stopped by, and Mickey told her why Goofy looked so glum. “Hmmm,” said Daisy. “This would be a good time for me to play
                            Dr. Daisy, but I don’t have my pretend-doctor bag.”</p>
                         <p>“We can fix that,” said Mickey. He called, “Oh, Toodles!”</p>
                    </div>
                </div>
            </div>

            <div id='page_8'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_eightA.jpg" alt="page eight" /> </div>
                    <div class="clickText">
                        <p>“Thanks, Toodles,” said Daisy.</p>
                        <p>“The doctor will examine parts of your body, such as your ears,” said Dr. Daisy.</p>
                        <p>“That’s an otoscope,” said Mickey.</p>
                        <p>“Very good, pretend-patient Mickey!” said Dr. Daisy.</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_eightB.jpg" alt="page four" /> </div>
                    <div class="clickText">
                        <p> Goofy asked, “Does that hurt?”</p>
                        <p>“Nope. Not a bit,” said Mickey.</p>
                        <p>“Garwsh,” said Goofy. “You’ve got the biggest ears in town, so if it doesn’t hurt you, it won’t hurt me!” </p>
                    </div>
                </div>
            </div>
            
            <div id='page_9'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_nineA.jpg" alt="page nine" /> </div>
                    <div class="clickText">
                        <p>Next Daisy said that the doctor uses a stethoscope to listen to heartbeats.</p>
                        <p>Goofy said, “Hy-yuck! Then I guess it’s a good thing I wore these today!”</p>
                        <p>“Oh, Goof.” Mickey laughed. “Not those hearts. Your real heart; <br />the one inside your body!”</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_nineB.jpg" alt="page four" /> </div>
                </div>
            </div>

            <div id='page_10'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_tenA.jpg" alt="page ten " /> </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_tenB.jpg" alt="page four" /> </div>
                    <div class="clickText" style="padding-left:40px">
                        <p>Daisy listened to Mickey’s heart.</p>
                        <p>“What does it sound like?” asked Goofy.<p>
                        <p>Daisy said, “It goes lub-dub, lub-dub. Here, Goofy,” <br />Daisy continued, “you try it.”</p>
                        <p>“What do you hear?” asked Mickey.</p>
                        <p>“Fi-fi-fo-fum!” said Goofy. </p>
                        <p>“Huh?” said Mickey</p>
                        <p>“Hi, there!” called Willie the giant.</p>
                    </div>
                </div>
            </div>
            <div id='page_11'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_elevenA.jpg" alt="page eleven " /> </div>
                    <div class="clickText">
                        <p>Willie the friendly giant wanted to help, too. </p>
                        <p>“When I go to the doctor,” said Willie, “my favorite part is getting to stick out my tongue and say AHH. Then the doctor can examine <br />my throat.”</p>
                        <p>Willie showed them how he does it. “AHHHH,” he roared.</p>
                        <p>“Oh, boy,” said Mickey. “Thanks, Willie. We get the idea!”</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_elevenB.jpg" alt="page four" /> </div>
                </div>
            </div>
            <div id='page_12'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_twelveA.jpg" alt="page twelve" /> </div>
                    <div class="clickText">
                        <p>Goofy was starting to feel better. “So that’s it?” he asked.</p>
                        <p>“That’s most of it,” said Daisy. “Um, you might also need to get <br />a . . . shot.”</p>
                        <p>“Oh, no!” hollered Goofy. “Don’t come near me with that pointy thing! Besides, I’m not sick!”</p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_twelveB.jpg" alt="page four" /> </div>
                </div>
            </div>
            <div id='page_13'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_thirteenA.jpg" alt="page thirteen" /> </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_thirteenB.jpg" alt="page four" /> </div>
                    <div class="clickText">
                        <p>Daisy explained that sometimes the doctor gives you a shot with medicine to keep you from getting sick.</p>
                        <p>“But it’s gotta hurt,” said Goofy.</p>
                        <p>“Not as much as you think,” said Daisy.</p>
                        <p>“That reminds me,” said Mickey, “I have a thinking trick that I use when I get a shot.”</p>
                    </div>
                </div>
            </div>
            <div id='page_14'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_fourteenA.jpg" alt="page fourteen " /> </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_fourteenB.jpg" alt="page four" /> </div>
                    <div class="clickText">
                        <p>“Do you make the doctor disappear?” asked Goofy.</p>
                        <p>“Nope,” said Mickey. “I close my eyes and think about things that I like; then I count them. Can you guess what I think about?”</p>
                        <p>“Hot dogs!” said Goofy.</p>
                        <p>“You betcha,” said Mickey. “By the time I count three of them, it’s all over.”</p>
                        <p>“Say, that is a neat trick,” said Goofy. “I think I’ll count hot-fudge sundaes!”</p>
                    </div>
                </div>
            </div>
            <div id='page_15'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_fifteenA.jpg" alt="page fifteen " /> </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_fifteenB.jpg" alt="page four" /> </div>
                    <div class="clickText">
                        <p>It was time for Goofy and Mickey to go.</p>
                        <p>Daisy reminded them that they might have to sit in the doctor’s <br />waiting room for a little while. “So it’s a good idea to bring a book or a toy you like,” said Daisy.</p>
                        <p>“Another good idea. Be right back,” said Goofy. “I’ll meet you by the car.”</p>
                    </div>
                </div>
            </div>
            <div id='page_16'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_sixteenA.jpg" alt="page sixteen " /> </div>
                    <div class="clickText">
                        <p>“We won’t have to wait that long, Goof,” said Mickey. “And we can’t fit all that into the car!”</p>
                        <p>Goofy thought for a few minutes. Then he said, “If I can’t bring all my stuff, can I bring all my friends instead?” </p>
                        <p>“Great idea, Goofy” said Mickey, smiling. </p>
                    </div>
                </div>
                <div class="pageRight">
                    <div> <img src="childrens_books/images/page_sixteenB.jpg" alt="page four" /> </div>
                </div>
            </div>
            <div id='page_17'>
                <div class="pageLeft">
                    <div> <img src="childrens_books/images/page_seventeenA.jpg" alt="page seventeen" /> </div>
                    <div class="clickText">
                        <p>Finally Goofy did go to the doctor—and he brought along the whole gang. Hot diggety dog!</p>
                   </div>
                </div>
                <div class="pageRight">
                </div>
            </div>

        </div>
		
		<div id="chromeBottom">&nbsp;</div>

    </body>
	<script type="text/javascript" src="Game/memory.js"></script>
</html>
*/