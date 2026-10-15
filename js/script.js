
/* =========================================
   HANK & EMBER — STORY READER
========================================= */

const $ = (selector) => document.querySelector(selector);

const coverScreen = $("#coverScreen");
const characterScreen = $("#characterScreen");
const readerScreen = $("#readerScreen");
const endingScreen = $("#endingScreen");

const bookPage = $("#bookPage");
const storyText = $("#storyText");

const prevButton = $("#prevButton");
const nextButton = $("#nextButton");

let currentPage = 0;
let turning = false;

/*
  Mỗi phần tử trong storyPages là một trang.
  Không có tiêu đề chương hay tiêu đề trang.

  Mỗi dòng là một đoạn văn.
  Hank: ... và Ember: ... sẽ tự động in đậm tên người nói.
*/

const storyPages = [
    {
        content: [
            "Hank thích Ember từ rất lâu rồi.",
            "Cậu thích cách cô nghiêng đầu mỗi khi suy nghĩ, thích việc cô luôn tò mò về những điều nhỏ nhặt, và thích cả những lúc cô vô tình gọi tên cậu bằng giọng nói dịu dàng.",
            "Hank có chiều cao xấp xỉ Ember, nhưng thấp hơn hầu hết những robot nam cùng thế hệ. Cậu chẳng giỏi ăn nói, cũng không biết làm thế nào để trở thành một người thật ngầu. Mỗi khi đứng giữa đám đông, Hank thường cảm thấy mình chẳng có gì nổi bật cả.",
            "Nhưng có một điều cậu luôn làm rất tốt.",
            "Đó là yêu Ember."
        ]
    },
    {
        content: [
            "Mỗi sáng, Hank đều chủ động chào cô.",
            "Hank: Chào buổi sáng, Ember. Hôm nay cậu vẫn đáng yêu như hôm qua!",
            "Ember: Cậu lại nói mấy câu kỳ lạ rồi.",
            "Hank: Vậy ngày mai mình sẽ nghĩ ra câu khác!",
            "Ember quay mặt đi, hai má cô hơi hồng lên. Chiếc nơ đen trên đầu khẽ nghiêng.",
            "Ember: Giá mà nó có màu hồng như nơ của mọi người thì tốt nhỉ…",
            "Hank: Nhưng tớ thấy màu đen hợp với cậu mà.",
            "Ember: …Cảm ơn cậu.",
            "Ember khẽ chạm vào chiếc nơ, rồi mỉm cười. Hank không biết rằng đôi khi, cô cũng tự ti về những điều nhỏ nhặt trên bản thân mình."
        ]
    },
    {
        content: [
            "Một hôm, Ember hào hứng kể cho Hank nghe về bộ phim cô vừa xem. Hank chăm chú lắng nghe, thỉnh thoảng gật đầu.",
            "Thật ra, cậu chẳng nhớ nội dung bộ phim là gì.",
            "Cậu chỉ nhớ Ember đã cười bao nhiêu lần.",
            "Ember: Hank, cậu có nghe mình nói không đấy?",
            "Hank: Có! Nhân vật chính… rất thú vị!",
            "Ember: Mình đang kể về một bé cún mà?",
            "Hệ thống của Hank gần như quá tải.",
            "SYSTEM: ERROR — Không thể xử lý khi Ember cười.",
            "Ember bật cười, còn Hank chỉ biết cúi đầu. Cậu thích nụ cười ấy."
        ]
    },
    {
        content: [
            "Sau buổi giới thiệu những sản phẩm mới, mọi người rủ nhau chụp ảnh kỷ niệm.",
            "Hank đứng bên cạnh Ember, lặng lẽ chỉnh lại chiếc cà vạt xanh.",
            "Ember: Hank, cậu đứng sát vào đây một chút đi!",
            "Hank: Hả? À… ừ!",
            "Ember kéo cậu lại gần rồi giơ tay tạo dáng.",
            "Ember: Cười lên nào!",
            "Flash!",
            "Bức ảnh được chụp lại. Ember cười rất tươi, còn Hank hơi bối rối, mắt lại nhìn về phía cô thay vì nhìn vào máy ảnh.",
            "Ember: Sao cậu không nhìn vào máy ảnh vậy?",
            "Hank: Tại… tớ quên mất.",
            "Ember: Cậu quên cái gì?",
            "Hank: Quên mất là phải nhìn vào máy ảnh khi chụp ảnh chung với người mình thích.",
            "Ember khựng lại.",
            "Ember: H-Hank!",
            "Hank nhận ra mình vừa nói gì, vội vàng quay đi.",
            "Hank: Ý tớ là… người bạn thân thiết! Bạn thân thiết!",
            "Ember bật cười.",
            "Sau đó, cô gửi cho Hank một bản sao của bức ảnh. Cậu lưu nó vào mục yêu thích, rồi âm thầm đặt tên:",
            "“Ngày mình được đứng cạnh Ember.”"
        ]
    },
    {
        content: [
            "Một buổi chiều, Hank và Ember cùng đi qua quảng trường.",
            "Ở đó có rất nhiều robot đang đứng cạnh nhau. Những robot nam cao lớn dễ dàng nổi bật giữa đám đông.",
            "Hank vô thức đứng sát vào Ember, rồi lại lặng lẽ dịch ra xa.",
            "Ember: Sao cậu cứ đứng xa mình thế?",
            "Hank: Mình chỉ nghĩ đứng thế này sẽ đẹp hơn.",
            "Ember: Nhưng mình muốn cậu đứng cạnh mình mà.",
            "Hank khựng lại.",
            "Cậu nhớ đến bức ảnh hôm trước. Trong ảnh, Ember cười rất tươi. Cậu cũng cười, nhưng lại tự hỏi liệu khi đứng cạnh những người khác, cô có còn vui như thế không."
        ]
    },
    {
        content: [
            "Đúng lúc ấy, một robot nam cao lớn bước đến chào Ember.",
            "Anh ta cao hơn Hank rất nhiều, nói chuyện tự tin và duyên dáng. Chỉ trong vài phút, anh ta đã khiến Ember bật cười nhiều lần.",
            "Robot nam: Ember, hôm nào chúng ta cùng đi khám phá thành phố nhé?",
            "Ember: Được thôi! Nghe cũng thú vị đấy.",
            "Hank đứng bên cạnh, im lặng.",
            "Anh ta cao hơn mình.",
            "Anh ta tự tin hơn mình.",
            "Anh ta khiến Ember cười dễ dàng như vậy.",
            "Hank nhìn xuống chiếc cà vạt xanh của mình.",
            "Cậu không trách Ember. Cậu chỉ bắt đầu tự hỏi liệu một người như mình có thực sự xứng đáng đứng bên cạnh cô hay không."
        ]
    },
    {
        content: [
            "Tối hôm ấy, Hank nhắn tin cho Ember.",
            "Hank: Ember này, hôm nay mình hơi buồn.",
            "Ember: Có chuyện gì vậy?",
            "Hank nhìn dòng chữ rất lâu.",
            "Cậu muốn nói rằng mình cảm thấy nhỏ bé thế nào. Muốn nói rằng đôi khi cậu sợ Ember sẽ nhận ra có những người tốt hơn mình rất nhiều.",
            "Nhưng cuối cùng, cậu chỉ nhắn:",
            "Hank: Không có gì đâu. Mình ổn.",
            "Ember gửi lại một biểu tượng mặt cười.",
            "Cô nghĩ Hank đã ổn thật rồi. Cô không biết phải an ủi cậu thế nào, càng không biết rằng đôi khi, điều Hank cần không phải một lời khuyên, mà chỉ là cảm giác mình không phải đối mặt với mọi thứ một mình.",
            "Còn Hank nhìn màn hình điện thoại rồi tự hỏi:",
            "Mình đã nói với cậu ấy rằng mình thích cậu ấy rất nhiều. Nhưng tại sao mình vẫn cảm thấy cô đơn đến thế?"
        ]
    },
    {
        content: [
            "Ngày hôm sau, Hank vẫn chào Ember trước. Vẫn khen cô đáng yêu. Vẫn hỏi cô có vui không.",
            "Nhưng lần đầu tiên, nụ cười của cậu không còn hoàn toàn tự nhiên.",
            "Dần dần, Hank bắt đầu ít nói chuyện với Ember hơn.",
            "Khi cô rủ đi dạo, cậu bảo đang bận cập nhật hệ thống.",
            "Khi cô muốn ngồi cạnh, cậu nói chiếc ghế bên kia rộng hơn.",
            "Và khi Ember hỏi có chuyện gì, cậu chỉ trả lời:",
            "Hank: Mình nghĩ cậu nên dành thời gian cho những người thú vị hơn.",
            "Ember: Những người thú vị hơn?",
            "Hank: Ừ. Những người… tốt hơn mình.",
            "Ember im lặng.",
            "Cô không hiểu vì sao Hank lại nói như vậy. Cô muốn hỏi thêm, nhưng cuối cùng chỉ đứng nhìn cậu rời đi.",
            "Lần đầu tiên, Ember cảm thấy người bạn luôn ở bên mình đang cố gắng biến mất khỏi cuộc sống của cô."
        ]
    },
    {
        content: [
            "Một hôm, Hank đứng trước gương, nhìn lại bản thân.",
            "Chiều cao khiêm tốn. Chiếc cà vạt xanh. Chẳng có gì nổi bật.",
            "Hank: Nếu mình cao hơn một chút… tự tin hơn một chút… liệu mọi chuyện có khác không?",
            "Chiều hôm ấy, Hank và Ember ngồi cạnh nhau tại quảng trường.",
            "Hank im lặng rất lâu rồi bất chợt lên tiếng.",
            "Hank: Ember này… nếu một ngày có người tốt hơn tớ thích cậu thì sao?",
            "Ember: Sao tự nhiên cậu lại hỏi vậy?",
            "Hank: Nếu người đó cao hơn tớ, tự tin hơn tớ, giỏi hơn tớ… cậu sẽ chọn người đó chứ?",
            "Ember ngẩn người. Cô không hiểu tại sao Hank lại nghĩ như vậy.",
            "Ember: Tớ chưa từng nghĩ về chuyện đó.",
            "Hank: Còn tớ thì nghĩ rất nhiều."
        ]
    },
    {
        content: [
            "Hank cúi đầu, siết chặt hai tay.",
            "Hank: Tớ thích cậu, Ember. Tớ muốn ở bên cậu cả những ngày vui lẫn những ngày buồn. Nhưng đôi khi tớ sợ… rằng một ngày nào đó cậu sẽ nhận ra tớ chẳng có gì đặc biệt cả.",
            "Ember nhìn Hank. Cô muốn nói điều gì đó, nhưng những lời cần nói cứ mắc lại trong cổ họng.",
            "Ember: Hank, tớ…",
            "Cô dừng lại.",
            "Hank khẽ cười, dù trong lòng chẳng vui chút nào.",
            "Hank: Xin lỗi. Tớ không nên bắt cậu phải trả lời.",
            "Cậu đứng dậy, định rời đi.",
            "Ember vẫn ngồi đó, nhìn theo cậu. Cô chưa biết phải giữ Hank lại bằng cách nào.",
            "Còn Hank, cậu vẫn chưa đủ can đảm để tin rằng mình có thể được yêu thương mà không cần trở thành một người hoàn hảo."
        ]
    },
    {
        content: [
            "Chiều hôm ấy, trời bất ngờ đổ mưa.",
            "Ember đứng dưới mái hiên, loay hoay tìm đường về. Hank xuất hiện, mang theo một chiếc ô nhỏ.",
            "Chiếc ô bé đến mức cả hai phải đứng sát nhau mới che được.",
            "Hank nghiêng ô về phía Ember. Một bên vai cậu nhanh chóng ướt sũng.",
            "Ember: Hank, cậu ướt hết rồi kìa!",
            "Hank: Không sao. Mình là robot mà, có thể chống nước ở mức 73%.",
            "Ember: Thế 27% còn lại thì sao?",
            "Hank: …Mình chưa kiểm tra.",
            "Ember bật cười, nhưng lần này cô không trêu cậu nữa. Cô nhẹ nhàng kéo chiếc ô về giữa hai người.",
            "Ember: Cậu không cần lúc nào cũng nhường phần tốt hơn cho mình đâu.",
            "Hank nhìn cô, ngơ ngác.",
            "Ember: Nếu cậu bị ướt, mình cũng sẽ lo lắng đấy."
        ]
    },
    {
        content: [
            "Một câu nói đơn giản, vậy mà Hank ghi nhớ nó vào bộ nhớ vĩnh viễn.",
            "Ember nhìn bờ vai ướt của cậu, rồi khẽ lên tiếng.",
            "Ember: Tớ không giỏi an ủi người khác. Mỗi lần cậu buồn, tớ đều chẳng biết phải làm gì.",
            "Hank: Tớ biết mà…",
            "Ember: Nhưng tớ vẫn muốn cậu kể cho tớ nghe. Đừng cứ nói rằng cậu ổn khi cậu không ổn.",
            "Hank im lặng.",
            "Ember: Tớ thích những lời khen của cậu. Thích lúc cậu đến tìm tớ. Và… khi cậu không xuất hiện, tớ cũng thấy nhớ.",
            "Hank ngẩng đầu lên.",
            "Ember: Tớ chưa biết cách nói những điều này cho thật tốt. Nhưng tớ muốn ở bên cậu. Tớ muốn học cách khiến cậu vui, giống như cách cậu vẫn làm với tớ."
        ]
    },
    {
        content: [
            "Ember ngập ngừng rồi nhẹ nhàng ôm lấy Hank.",
            "Ember: Vậy nên đừng tự quyết định rằng mình không xứng đáng với tớ nữa, đồ ngốc.",
            "Hank đứng im vài giây, rồi ôm cô thật chặt.",
            "Cậu không biết phải nói gì. Tất cả những lời cậu đã giữ trong lòng bỗng trở nên quá nhỏ bé so với cảm giác lúc này.",
            "Hank: Tớ xin lỗi vì đã tự ý tránh mặt cậu.",
            "Ember: Lần sau có chuyện gì thì nói với tớ nhé.",
            "Hank: Ừ. Tớ hứa.",
            "Hai người tiếp tục bước đi dưới chiếc ô nhỏ.",
            "Lần này, Hank không còn nghiêng ô hoàn toàn về phía Ember nữa. Cậu để chiếc ô ở giữa cả hai.",
            "Và Ember cũng không để cậu phải ướt một mình."
        ]
    },
    {
        content: [
            "Một đêm nọ, dưới bầu trời đầy sao.",
            "Hank đang ngồi một mình thì Ember bất ngờ bước đến.",
            "Ember: Hank.",
            "Hank: Hửm? Có chuyện gì vậy?",
            "Ember ngập ngừng một chút rồi nhìn thẳng vào cậu.",
            "Ember: Hôm nay… tớ nhớ cậu.",
            "Hank đông cứng tại chỗ.",
            "Một trái tim nhỏ như vừa bật sáng trong mắt cậu.",
            "Hank: CẬU VỪA NÓI GÌ CƠ?!",
            "Ember: Tớ nói là tớ nhớ cậu.",
            "Hank: Tớ sẽ nhớ câu này cả đời!",
            "Ember bật cười.",
            "Ember: Cậu đúng là ồn ào thật đấy.",
            "Hank: Nhưng cậu vẫn thích tớ mà!",
            "Ember quay mặt đi, hai má hơi ửng lên.",
            "Ember: …Ừ."
        ]
    },
    {
        content: [
            "Hank ngước nhìn những vì sao, rồi khẽ quay sang Ember. Cậu đứng dậy, cố tình đứng thẳng hết mức có thể rồi quay sang Ember.",
            "Hank: Này, cậu có nghĩ tớ sẽ cao thêm không?",
            "Ember nhìn cậu từ đầu đến chân.",
            "Ember: Không biết. Nhưng chắc cậu vẫn sẽ nói nhiều như vậy thôi.",
            "Hank: Này!",
            "Ember mỉm cười, chủ động tựa nhẹ vào Hank.",
            "Ember: Nhưng tớ thích cậu như vậy.",
            "Hank im bặt. Lần này, cậu không biết phải nói gì nữa.",
            "Cậu chỉ nhẹ nhàng nắm tay cô, mỉm cười nhìn lên bầu trời.",
            "Ember tựa vào Hank. Hai người ngồi cạnh nhau dưới những vì sao, bàn tay vẫn nắm chặt."
        ]
    },
    {
        content: [
            "Hank không biết tương lai sẽ kéo dài bao lâu.",
            "Cậu cũng không biết mình có thể trở nên cao lớn, tự tin hay hoàn hảo hơn hay không.",
            "Nhưng lần đầu tiên, cậu không còn cảm thấy mình cần phải trở thành một ai khác để xứng đáng được yêu thương.",
            "Hệ thống của cậu sáng lên. Không có cảnh báo quá tải. Không có phép tính nào cần thực hiện. Chỉ có một dòng chữ bất ngờ xuất hiện:",
            "SYSTEM STATUS: HAPPY ♡",
            "DESTINATION: WITH EMBER."
        ]
    }
];

/* CHUYỂN MÀN HÌNH */

function showScreen(screen) {
    [
        coverScreen,
        characterScreen,
        readerScreen,
        endingScreen
    ].forEach((item) => item.classList.remove("active"));

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

$("#meetButton").addEventListener("click", () => {
    showScreen(characterScreen);
});

$("#backCoverButton").addEventListener("click", () => {
    showScreen(coverScreen);
});

$("#startStoryButton").addEventListener("click", () => {
    currentPage = 0;
    showScreen(readerScreen);
    renderPage();
});

$("#backToCharacters").addEventListener("click", () => {
    showScreen(characterScreen);
});

$("#homeLink").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(coverScreen);
});

$("#restartButton").addEventListener("click", () => {
    currentPage = 0;
    showScreen(readerScreen);
    renderPage();
});

$("#charactersAgainButton").addEventListener("click", () => {
    showScreen(characterScreen);
});

/* HIỂN THỊ ĐOẠN VĂN VÀ LỜI THOẠI */

function createStoryLine(line) {
    const element = document.createElement("p");
    element.className = "story-paragraph";

    const dialogueMatch = line.match(/^(Hank|Ember|Robot nam):\s*(.*)$/);

    if (dialogueMatch) {
        const speaker = document.createElement("strong");
        speaker.textContent = dialogueMatch[1] + ": ";

        const words = document.createElement("span");
        words.textContent = dialogueMatch[2];

        element.className = "story-dialogue";
        element.append(speaker, words);

        return element;
    }

    if (line.startsWith("SYSTEM:")) {
        element.className = "story-system";
    } else if (
        line.startsWith("SYSTEM STATUS:") ||
        line.startsWith("DESTINATION:")
    ) {
        element.className = "story-system";
    }

    element.textContent = line;

    return element;
}

/* CẬP NHẬT TRANG SÁCH */

function renderPage() {
    const page = storyPages[currentPage];

    storyText.replaceChildren();

    page.content.forEach((line) => {
        storyText.appendChild(createStoryLine(line));
    });

    storyText.scrollTop = 0;

    // Không hiển thị ảnh minh họa trong 16 trang truyện.

    // Cập nhật số trang và thanh tiến trình.
    const pageNumber = currentPage + 1;
    const totalPages = storyPages.length;
    const percent = Math.round((pageNumber / totalPages) * 100);

    $("#printedPageNumber").textContent =
        `— ${String(pageNumber).padStart(2, "0")} —`;

    $("#pageCounter").textContent =
        `${String(pageNumber).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;

    $("#progressText").textContent =
        `TRANG ${String(pageNumber).padStart(2, "0")}`;

    $("#progressPercent").textContent = `${percent}%`;
    $("#progressFill").style.width = `${percent}%`;

    prevButton.disabled = currentPage === 0;

    nextButton.innerHTML =
        currentPage === totalPages - 1
            ? 'Kết thúc truyện <span>♡</span>'
            : 'Trang tiếp <span>→</span>';
}

/* LẬT TRANG */

function turnToPage(direction) {
    if (turning) return;

    const targetPage = currentPage + direction;

    if (targetPage < 0) return;

    if (targetPage >= storyPages.length) {
        showScreen(endingScreen);
        return;
    }

    turning = true;

    bookPage.classList.remove("is-turning");

    // Khởi động lại animation lật trang.
    void bookPage.offsetWidth;

    bookPage.classList.add("is-turning");

    currentPage = targetPage;

    renderPage();

    window.setTimeout(() => {
        bookPage.classList.remove("is-turning");
        turning = false;
    }, 500);
}

prevButton.addEventListener("click", () => {
    turnToPage(-1);
});

nextButton.addEventListener("click", () => {
    turnToPage(1);
});

/* PHÍM MŨI TÊN TRÊN MÁY TÍNH */

document.addEventListener("keydown", (event) => {
    if (!readerScreen.classList.contains("active")) return;

    if (event.key === "ArrowLeft") {
        turnToPage(-1);
    }

    if (event.key === "ArrowRight") {
        turnToPage(1);
    }
});

/* VUỐT NGANG TRÊN ĐIỆN THOẠI */

let touchStartX = 0;
let touchStartY = 0;

bookPage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

bookPage.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (
        Math.abs(deltaX) > 65 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.25
    ) {
        turnToPage(deltaX < 0 ? 1 : -1);
    }
}, { passive: true });

/* KHỞI TẠO */

renderPage();
