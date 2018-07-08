var DroppedHandler = (function DroppedHandler() {

    function _preventDefault(elements) {
        elements.forEach((dropzone) => {
            dropzone.ondrop = function(e) {
                e.preventDefault();
                e.stopPropagation();
            };
        });
    }

    function handle(droppedElements, handlerFunction) {
        _preventDefault(droppedElements);
        droppedElements.forEach((dropzone) => {
            dropzone.ondrop = function(e) {
                typeof handlerFunction === 'function' && handlerFunction(e, dropzone);
            };
        });
    }

    var dropHandlerApi = {
        handle: handle
    };

    return dropHandlerApi;
})();

$(document).ready(function() {
    function readURL(input) {
        var dataUploadId = input.getAttribute('data-upload-id');
        if (input.files && input.files[0]) {
            handleFile(dataUploadId, input.files[0]);
        }
    }

    $(".upload-input1").on('change', function(e) {
        readURL(this);
    });

    // preventing any dropped image to get opened in browser
    $('body').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // adding drop events for every carousel
    var dropzoneElements = document.querySelectorAll('.carousel-inner');
    DroppedHandler.handle(dropzoneElements, function(e, dropzone) {
        var file = e.dataTransfer.files[0];
        var dataUploadId = $(dropzone).find('input').attr('data-upload-id');
        handleFile(dataUploadId, file);
    });

    function handleFile(dataUploadId, inputFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + dataUploadId).attr('src', e.target.result);
        }
        reader.readAsDataURL(inputFile);
    }
});