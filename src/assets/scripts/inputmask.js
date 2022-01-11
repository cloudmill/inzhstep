import mask from "inputmask";

Inputmask({ mask: "+7 (999) 999-9999", showMaskOnHover: false }).mask(
  "[data-mask=phone]"
);
