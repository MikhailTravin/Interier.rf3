//nouislider
if ($(".catalog-filter").length) {

    const slider = document.querySelectorAll(".range-slider");

    slider.forEach((sliderElement) => {

        const filterInputs = sliderElement
            .closest(".catalog-filter__wrapper")
            .querySelectorAll(".input-filter");

        const sliderMin = parseInt(sliderElement.dataset.min);
        const sliderMax = parseInt(sliderElement.dataset.max);
        const sliderStepStart = parseInt(sliderElement.dataset.stepStart);
        const sliderStepEnd = parseInt(sliderElement.dataset.stepEnd);

        const tooltipsContainer = document.createElement('div');
        tooltipsContainer.className = 'slider-tooltips';

        const tooltipMin = document.createElement('div');
        tooltipMin.className = 'slider-tooltip slider-tooltip--min';

        const tooltipMax = document.createElement('div');
        tooltipMax.className = 'slider-tooltip slider-tooltip--max';

        tooltipsContainer.appendChild(tooltipMin);
        tooltipsContainer.appendChild(tooltipMax);

        sliderElement.parentNode.insertBefore(tooltipsContainer, sliderElement.nextSibling);

        noUiSlider.create(sliderElement, {
            start: [sliderStepStart, sliderStepEnd],
            connect: true,
            step: 1,
            range: {
                min: [sliderMin],
                max: [sliderMax],
            },
        });

        const updateTooltips = (values) => {
            const percentMin = (parseFloat(values[0]) - sliderMin) / (sliderMax - sliderMin) * 100;
            const percentMax = (parseFloat(values[1]) - sliderMin) / (sliderMax - sliderMin) * 100;

            tooltipMin.textContent = Math.round(values[0]);
            tooltipMax.textContent = Math.round(values[1]);

            tooltipMin.style.left = percentMin + '%';
            tooltipMax.style.left = percentMax + '%';
        };

        updateTooltips([sliderStepStart, sliderStepEnd]);

        sliderElement.noUiSlider.on("update", (values, handle) => {
            filterInputs[handle].value = Math.round(values[handle]);
            updateTooltips(values);
        });

        sliderElement.noUiSlider.on('change.one', (values, handle) => {
            $(filterInputs[handle]).trigger('keyup');
        });

        filterInputs.forEach((input, indexInput) => {
            input.addEventListener("input", () => {
                input.value = input.value.replace(/\D/g, "");
                sliderElement.noUiSlider.setHandle(indexInput, input.value);
            });
        });
    });
}