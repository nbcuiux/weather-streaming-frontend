// Set Magnificpopup instance for later use
var magnificPopup = $.magnificPopup.instance;
var isStreaming = false;

/* ==========================================================================
    Show/Hide Cloud Popup
   ========================================================================== */
function showCloudPopup() {
  $('.social-item__notification--facebook').addClass('visible');
  // Set the Scale of the cloud popup to 0
  TweenMax.set($('.social-item__notification--facebook svg path'), {scale: 0});

  var notificationPopupTL = new TimelineMax();
  notificationPopupTL.staggerTo($('.social-item__notification--facebook svg path'), 0.15, {scale: 1, ease: Power2.linear}, 0.1)
    .to($('.social-item__notification--facebook p'), 0.25, {opacity: 1})
    .staggerTo($('.social-item__notification--facebook a'), 0.25, {opacity: 1}, 0.25);
}

function hideCloudPopup() {
  // Fade out parents Div
  var notificationPopupTL = new TimelineMax({onComplete: function() {
    // Remove element display from the DOM
    $('.social-item__notification--facebook').removeClass('visible');
    // Reset elements to original animation state
    TweenMax.set($('.social-item__notification--facebook a'), {opacity: 0});
    TweenMax.set($('.social-item__notification--facebook p'), {opacity: 0});
    TweenMax.set($('.social-item__notification--facebook'), {opacity: 1});
  }});
  // The actual timeline.
  notificationPopupTL.to($('.social-item__notification--facebook'), 0.25, {opacity: 0});
}

/* ==========================================================================
    Main JS
   ========================================================================== */
$(document).ready(function() {
  /* ============================================
   *  The Button that actually starts the stream
   * ============================================ */
  $('#btnStartStream').on('click', function(e) {
    e.preventDefault();
    // Check if title has been added.
    if ($('#streamTitle').val() === '') {
      // Prompt user to add a title if left blank
      $('#streamTitleError').addClass('visible');
    } else {
      // Remove the title error message
      $('#streamTitleError').removeClass('visible');

      // Add processing indicator to button to show loading before ajax call returns
      $(this).html('<i class="fa fa-spinner fa-spin"></i>');

      // Placeholder for successful AJAX request essentially
      window.setTimeout(function() {
        isStreaming = true;

        // Capture the title and print it out on the dashboard
        var streamTitle = $('#streamTitle').val();
        $('.main__header--headline').html('Now Streaming: "' + streamTitle + '"');

        // Set the status of each social.
        $('.social-item').each(function() {
          // If input is selected and the stream is connected set the section to "online"
          if ($(this).find('input').is(':checked')) {
            isStreaming ? $(this).addClass('online') : $(this).addClass('offline');
          } else {
            $(this).addClass('offline');
          }
        });
        // Add Facebook Notification
        showCloudPopup();
        // Hide "Add Title" section
        $('.main__instructions').addClass('hidden');
        // Hide Start Popup button
        $('#btnStartStream').addClass('hidden');
        // Show Stream indicator button
        $('#btnStreamIndicator').removeClass('hidden');
        // Display the "End Stream" button
        $('#btnEndPopup').addClass('visible');

      }, 2000);
    }
  });

  /* ============================================
   *  Initiate the "End Stream" popup
   * ============================================ */
  $('#btnEndPopup').magnificPopup({
    type:'inline',
    midClick: true,
    showCloseBtn: false,
  });

  /* ============================================
   *  The Button that actually ends the stream
   * ============================================ */
  $('#btnEndStream').on('click', function(e) {
    var isStreaming = false;

    // Set the main page headlines back to their normal state.
    $('.main__header--headline').html('Select the accounts you would like to stream to.');
    
    // Remove status icons from each item and display the toggles.
    $('.social-item').each(function() {
      $(this).removeClass(['offline', 'online']);
    });

    // Close the popup
    magnificPopup.close();

    // Remove Facebook Notification
    hideCloudPopup();

    // Show "Add Title" section
    $('.main__instructions').removeClass('hidden');
    // Show original Start stream button
    $('#btnStartStream').html('Start Stream').removeClass('hidden');
    // Hide Stream indicator button
    $('#btnStreamIndicator').addClass('hidden');
    // Hide the "End Stream" button
    $('#btnEndPopup').removeClass('visible');
  });

  /* ==================================================
   *  Display / Hide notifications
   * ================================================== */
  // Display the token notification (simply by adding 'visible' class to .token-notification)
  $('#btnStartStream').on('click', function() {
    $('.token-notification').addClass('visible');
  });

  // Hide the token expire notification
  $('.token-notification__btn').on('click', function(e) {
    e.preventDefault();
    $('.token-notification').removeClass('visible');
  });

  // Hide the Facebook notification
  $('#hideFBNotification').on('click', function(e) {
    e.preventDefault();
    hideCloudPopup()
  });
});