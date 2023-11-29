
// selectpicker
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    $('#captureButton').click(function () {
        // const selectedValue = $('#mySelect').val();
        const selectedOptionText = $('#mySelect option:selected').text();
        const optionWords = selectedOptionText.split(' ');

        const teacherId = optionWords[0];
        const fname = optionWords[1];
        const lname = optionWords[2];

        // console.log(teacherId);
        $('#myTable tbody').html(`
        <tr>
         <td>${teacherId}</td>
         <td>${fname}</td>
         <td>${lname}</td>
        </tr>
      `);
        //console.log(selectedValue);
    });

});


// auto search
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    const selectOptions = $('#mySelect2 option');

    const optionTexts = selectOptions.map(function () {
        return $(this).text();
    }).get();

    $('#autocompleteInput').autocomplete({
        source: optionTexts,
        minLength: 1
    });

    $('#autocompleteInput2').autocomplete({
        source: optionTexts,
        minLength: 1
    });

    console.log(optionTexts);
});