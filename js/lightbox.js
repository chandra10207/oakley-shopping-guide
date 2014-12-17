function LightBoxClass()
{
    var that = this;
    this.element;
    this.closeImg;
    this.init = function(container)
    {
        this.parentContainer = container;
        that.element = document.createElement("div");
        that.parentContainer.appendChild(that.element);
        that.element.className = "lightbox";
        that.closeImg = document.createElement("div");
        that.element.appendChild(that.closeImg);
        that.closeImg.className = "close-img";
        that.closeImg.onclick = function()
        {
            that.parentContainer.removeChild(that.element);
        };
        var image = document.createElement("img");
        var src = document.getElementsByClassName("zoom-right-side")[0].children[0].getAttribute("src");
        image.setAttribute("src", src);
        that.element.appendChild(image);
    };
}
var zoomImg = document.getElementById("zoomImg");
var lightBoxContainer = document.getElementById("contentId");
zoomImg.onclick = function()
{
    var aa = new LightBoxClass();
    aa.init(lightBoxContainer);
};
