/* ================================================
   SPECTRE AUTOS — main.js
   jQuery interactions for index.html + booking.html
   ================================================ */

$(function () {

  /* ---- CONSTANTS ---- */
  var FOUNDED = 2015;
  var YEAR    = new Date().getFullYear();

  /* ================================================
     FOOTER YEAR
     ================================================ */
  $('#footer-year').text(YEAR);

  /* ================================================
     YEARS-IN-BUSINESS STAT (hero on index)
     ================================================ */
  $('#years-stat').text((YEAR - FOUNDED) + '+');

  /* ================================================
     STICKY HEADER SHADOW ON SCROLL
     ================================================ */
  $(window).on('scroll', function () {
    $('#site-header').toggleClass('scrolled', $(this).scrollTop() > 10);
  });

  /* ================================================
     MOBILE MENU TOGGLE
     ================================================ */
  $('#menu-btn').on('click', function () {
    var isOpen = $('#mobile-menu').hasClass('open');
    $('#mobile-menu').toggleClass('open');
    $('#icon-open').toggleClass('hidden', !isOpen);
    $('#icon-close').toggleClass('hidden', isOpen);
    $(this).attr('aria-expanded', !isOpen);
  });

  // Close mobile menu when a nav link is tapped
  $('#mobile-menu a').on('click', function () {
    $('#mobile-menu').removeClass('open');
    $('#icon-open').removeClass('hidden');
    $('#icon-close').addClass('hidden');
    $('#menu-btn').attr('aria-expanded', false);
  });

  /* ================================================
     ACTIVE NAV LINK HIGHLIGHT ON SCROLL (index only)
     ================================================ */
  if ($('#home').length) {
    $(window).on('scroll.nav', function () {
      var scrollY = $(this).scrollTop() + 90;
      $('section[id]').each(function () {
        var top = $(this).offset().top;
        var bot = top + $(this).outerHeight();
        if (scrollY >= top && scrollY < bot) {
          $('nav a.nav-link').removeClass('active');
          $('nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
      });
    });
  }

  /* ================================================
     BACK-TO-TOP BUTTON
     ================================================ */
  var $btt = $('#back-to-top');
  $(window).on('scroll.btt', function () {
    if ($(this).scrollTop() > 350) {
      $btt.removeClass('hidden').css('display', 'flex');
    } else {
      $btt.addClass('hidden').css('display', '');
    }
  });
  $btt.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* ================================================
     INVENTORY FILTER (index.html)
     ================================================ */
  if ($('#vehicle-grid').length) {
    $('#apply-filter').on('click', function () {
      var maxPrice = $('#price-filter').val();
      var visible  = 0;
      $('#vehicle-grid article').each(function () {
        var price = parseInt($(this).data('price'), 10);
        if (maxPrice === 'all' || price <= parseInt(maxPrice, 10)) {
          $(this).fadeIn(250); visible++;
        } else {
          $(this).fadeOut(200);
        }
      });
      $('#filter-msg').text('Showing ' + visible + ' vehicle' + (visible !== 1 ? 's' : ''));
    });

    $('#reset-filter').on('click', function () {
      $('#price-filter').val('all');
      $('#vehicle-grid article').fadeIn(250);
      $('#filter-msg').text('');
    });
  }

  /* ================================================
     PAYMENT CALCULATOR (index.html)
     ================================================ */
  if ($('#calc-btn').length) {
    $('#calc-btn').on('click', function () {
      var price      = parseFloat($('#vehicle-price').val());
      var depositPct = parseFloat($('#deposit').val());
      var months     = parseInt($('#months').val(), 10);
      var $result    = $('#calc-result');

      // Validation
      if (!price || price < 1000000) {
        showCalcError('Please enter a valid vehicle price (minimum ₦1,000,000).');
        return;
      }
      if (!depositPct || depositPct < 30 || depositPct > 100) {
        showCalcError('Deposit must be between 30% and 100%.');
        return;
      }

      var deposit   = (price * depositPct) / 100;
      var loan      = price - deposit;
      var monthly   = loan / months;
      var tier      = price < 15000000 ? 'Economy' : price < 25000000 ? 'Mid-Range' : 'Luxury';

      $result
        .removeClass('hidden')
        .css({ 'background-color': 'rgba(237,174,73,.12)', 'border': '1px solid rgba(237,174,73,.35)', 'color': '#003D5B' })
        .html(
          '<p style="font-weight:600;margin-bottom:8px;">Payment Breakdown</p>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Vehicle Price</span><span style="font-weight:500;">₦' + price.toLocaleString('en-NG') + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Deposit (' + depositPct + '%)</span><span style="font-weight:500;">₦' + deposit.toLocaleString('en-NG') + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Loan Amount</span><span style="font-weight:500;">₦' + loan.toLocaleString('en-NG') + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding-top:8px;margin-top:8px;border-top:1px solid rgba(237,174,73,.35);">' +
          '<span style="font-weight:700;">Monthly Payment</span><span style="font-weight:700;color:#EDAE49;font-size:1.1em;">₦' + monthly.toLocaleString('en-NG') + '</span></div>' +
          '<p style="font-size:0.75em;color:#666;margin-top:6px;">Vehicle tier: ' + tier + '. Excludes interest — contact us for a final quote.</p>'
        )
        .hide().fadeIn(350);
    });

    function showCalcError(msg) {
      $('#calc-result')
        .removeClass('hidden')
        .css({ 'background-color': '#fef2f2', 'border': '1px solid #fca5a5', 'color': '#dc2626' })
        .html('<p>' + msg + '</p>')
        .hide().fadeIn(250);
    }
  }

  /* ================================================
     CONTACT FORM VALIDATION (index.html)
     ================================================ */
  if ($('#contact-form').length) {
    var $fb = $('#form-feedback');

    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var errors  = [];
      var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var name    = $('#c-name').val().trim();
      var email   = $('#c-email').val().trim();
      var message = $('#c-message').val().trim();
      var phone   = $('#c-phone').val().trim();

      if (!name)                    { errors.push('Full name is required.');    markError('#c-name'); }
      if (!email)                   { errors.push('Email is required.');        markError('#c-email'); }
      else if (!emailRx.test(email)){ errors.push('Enter a valid email.');      markError('#c-email'); }
      if (!message)                 { errors.push('Message cannot be empty.');  markError('#c-message'); }
      if (phone && !/^\d{11}$/.test(phone)) { errors.push('Phone must be 11 digits.'); markError('#c-phone'); }

      if (errors.length) {
        showFeedback($fb, errors.join('<br>'), false);
      } else {
        showFeedback($fb, '<strong>Message sent!</strong> Our team will contact you shortly.', true);
        this.reset();
      }
    });

    $('#form-reset').on('click', function () {
      clearErrors();
      $fb.addClass('hidden');
    });
  }

  /* ================================================
     BOOKING FORM (booking.html)
     ================================================ */
  if ($('#booking-form').length) {
    var $bfb = $('#booking-feedback');

    // Set min date to tomorrow
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#preferred-date').attr('min', tomorrow.toISOString().split('T')[0]);

    // Live step progress tracking
    $('#booking-form input, #booking-form select, #booking-form textarea').on('change input', updateProgress);
    updateProgress();

    $('#booking-form').on('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var errors = validateBooking();
      if (errors.length) {
        showFeedback($bfb, errors.join('<br>'), false);
        $('html,body').animate({ scrollTop: $bfb.offset().top - 130 }, 400);
        return;
      }

      // Generate reference
      var ref = 'SPECTRE-TD-' + YEAR + '-' + (Math.floor(1000 + Math.random() * 9000));
      $('#ref-number').text(ref);

      // Hide form, show confirmation
      $('#booking-form').fadeOut(300, function () {
        $('#confirmation-panel').removeClass('hidden').hide().fadeIn(400);
        $('html,body').animate({ scrollTop: 0 }, 500);
        // Mark all steps done
        $('.step-dot').removeClass('active').addClass('done');
        $('#prog-1,#prog-2,#prog-3').css('width', '100%');
      });
    });

    $('#booking-reset').on('click', function () {
      clearErrors();
      $bfb.addClass('hidden');
      setTimeout(updateProgress, 50);
    });

    function validateBooking() {
      var errors  = [];
      var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      var name  = $('#fullname').val().trim();
      var email = $('#email-address').val().trim();
      var phone = $('#phone-number').val().trim();
      var age   = parseInt($('#age').val(), 10);
      var veh   = $('#vehicle-model').val();
      var loc   = $('#pickup-location').val();
      var date  = $('#preferred-date').val();
      var time  = $('#preferred-time').val();
      var bud   = $('#budget-range').val();
      var lic   = $('input[name="license"]:checked').val();
      var terms = $('#terms-agree').is(':checked');

      if (!name)                     { errors.push('Full name is required.');           markError('#fullname'); }
      if (!email)                    { errors.push('Email is required.');               markError('#email-address'); }
      else if (!emailRx.test(email)) { errors.push('Enter a valid email address.');    markError('#email-address'); }
      if (!phone)                    { errors.push('Phone number is required.');        markError('#phone-number'); }
      else if (!/^\d{11}$/.test(phone)) { errors.push('Phone must be exactly 11 digits.'); markError('#phone-number'); }
      if (!age || age < 18)          { errors.push('You must be at least 18 years old.'); markError('#age'); }
      if (!veh)                      { errors.push('Please select a vehicle.');         markError('#vehicle-model'); }
      if (!loc)                      { errors.push('Please select a pickup location.'); markError('#pickup-location'); }
      if (!date)                     { errors.push('Please choose a preferred date.');  markError('#preferred-date'); }
      if (!time)                     { errors.push('Please choose a preferred time.');  markError('#preferred-time'); }
      if (!bud)                      { errors.push('Please select a budget range.');    markError('#budget-range'); }
      if (!lic)                      { errors.push("Please indicate if you have a driver's licence."); }
      if (!terms)                    { errors.push('You must agree to the Terms &amp; Conditions.'); }

      return errors;
    }

    function updateProgress() {
      // Step 1: 4 fields
      var s1 = [$('#fullname').val().trim(), $('#email-address').val().trim(), $('#phone-number').val().trim(), $('#age').val().trim()].filter(Boolean).length;
      var p1 = Math.round((s1 / 4) * 100);
      $('#prog-1').css('width', p1 + '%');
      setStepDot(1, p1);

      // Step 2: 4 fields
      var s2 = [$('#vehicle-model').val(), $('#pickup-location').val(), $('#preferred-date').val(), $('#preferred-time').val()].filter(Boolean).length;
      var p2 = Math.round((s2 / 4) * 100);
      $('#prog-2').css('width', p2 + '%');
      setStepDot(2, p2);

      // Step 3: budget
      var p3 = $('#budget-range').val() ? 100 : 0;
      $('#prog-3').css('width', p3 + '%');
      setStepDot(3, p3);

      // Step 4: terms
      setStepDot(4, $('#terms-agree').is(':checked') ? 100 : 0);
    }

    function setStepDot(step, pct) {
      var $dot = $('.step-dot[data-step="' + step + '"]');
      if (pct === 100) {
        $dot.removeClass('active').addClass('done');
      } else if (pct > 0) {
        $dot.removeClass('done').addClass('active');
      } else {
        $dot.removeClass('active done');
      }
    }
  }

  /* ================================================
     FAQ ACCORDION (booking.html)
     ================================================ */
  $(document).on('click', '.faq-toggle', function () {
    var $body  = $(this).next('.faq-body');
    var $arrow = $(this).find('.faq-arrow');
    var isOpen = $body.is(':visible');

    // Close all
    $('.faq-body').hide();
    $('.faq-arrow').removeClass('rotated');

    // Open this one if it was closed
    if (!isOpen) {
      $body.slideDown(250);
      $arrow.addClass('rotated');
    }
  });

  /* ================================================
     SHARED HELPERS
     ================================================ */
  function markError(selector) {
    $(selector).addClass('field-error');
  }

  function clearErrors() {
    $('.field-error').removeClass('field-error');
  }

  function showFeedback($el, html, success) {
    $el.removeClass('hidden')
       .css(success
         ? { background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#166534' }
         : { background:'#fef2f2', border:'1px solid #fca5a5', color:'#dc2626' })
       .html(html)
       .hide().fadeIn(300);
  }

  /* ================================================
     CONSOLE
     ================================================ */
  console.log('%c SPECTRE AUTOS ', 'background:#003D5B;color:#EDAE49;font-size:14px;font-weight:bold;padding:3px 6px;border-radius:3px;');
  console.log('✓ jQuery loaded | Year: ' + YEAR + ' | ' + (YEAR - FOUNDED) + ' years in business');

});
