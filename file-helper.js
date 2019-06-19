export function saveFile({ data, fileName, type }) {
  var a = document.createElement("a");
  var file = new Blob([data], { type });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}

export function loadFile(callbackFn) {
  var input = document.createElement("input");
  input.type = "file";
  input.addEventListener("change", () => readFile(input.files[0], callbackFn));

  document.body.appendChild(input);
  input.click();
  input.remove();
}

function readFile(file, callbackFn) {
  var reader = new FileReader();
  reader.readAsText(file);
  reader.addEventListener("load", event => {
    var result = event.target.result;

    callbackFn(result);
  });

  reader.addEventListener("error", event => {
    console.log("read file error", event);
  });
}
