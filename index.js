$(function () {
    let counter = 1;

    const fakeData = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Michael Brown", email: "michael.brown@example.com" },
      { name: "Emily Davis", email: "emily.davis@example.com" },
      { name: "Daniel Wilson", email: "daniel.wilson@example.com" },
      { name: "Olivia Martinez", email: "olivia.martinez@example.com" },
      { name: "William Anderson", email: "william.anderson@example.com" },
      { name: "Sophia Taylor", email: "sophia.taylor@example.com" },
      { name: "James Thomas", email: "james.thomas@example.com" }
    ];

    function renderTable(data) {
      const tbody = $("#contacts-table tbody");
      tbody.empty();
      counter = 1; // reset for fresh rendering
      $.each(data, function (index, item) {
        const row = `
          <tr data-index="${index}">
            <td>${counter++}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
        tbody.append(row);
      });
    }

    renderTable(fakeData);

    $("#save-btn").on("click", function () {
          const name = $("#name").val().trim();
          const email = $("#email").val().trim();

          // Simulated fake array for checking
          const isDuplicate = fakeData.some(item =>
              item.name.toLowerCase() === name.toLowerCase() ||
              item.email.toLowerCase() === email.toLowerCase()
          );

          const isValidName = /^[A-Za-zÀ-ÿ'.-]{2,}( [A-Za-zÀ-ÿ'.-]{2,})+$/.test(name);
          const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
          

          if (name === "" || email === "") {
              $("#validation-dialog").dialog({
                  title: "Validation Error",
                  modal: true,
                  open: function () {
                      const $dialog = $(this).closest(".ui-dialog");
                      const $btns = $dialog.find(".ui-dialog-buttonset button");
                      $btns
                          .addClass("btn btn-danger btn-sm")
                          .html('<i class="bi bi-x-circle me-1"></i> Close');

                      $dialog.find(".ui-dialog-titlebar-close")
                          .show()
                          .removeClass()
                          .addClass("ui-dialog-titlebar-close btn-close")
                          .html("&times;");
                  },
                  buttons: {
                      OK: function () {
                          $(this).dialog("close");
                      }
                  }
              });
          } else if (!isValidName) {
              $("<div title='Invalid Name'><p class='text-danger mb-0'>Please enter a full name (first and last name only, no numbers or special characters).</p></div>").dialog({
                  modal: true,
                  open: function () {
                      const $dialog = $(this).closest(".ui-dialog");
                      const $btns = $dialog.find(".ui-dialog-buttonset button");
                      $btns
                          .addClass("btn btn-danger btn-sm")
                          .html('<i class="bi bi-x-circle me-1"></i> Close');

                      $dialog.find(".ui-dialog-titlebar-close")
                          .show()
                          .removeClass()
                          .addClass("ui-dialog-titlebar-close btn-close")
                          .html("&times;");
                  },
                  buttons: {
                      Close: function () {
                          $(this).dialog("close");
                      }
                  }
              });
              return; // Stop further processing
          } else if (!isValidEmail) {
              // Show email format error dialog
              $("<div title='Invalid Email'><p class='text-danger mb-0'>Please enter a valid email address.</p></div>").dialog({
                  modal: true,
                  open: function () {
                      const $dialog = $(this).closest(".ui-dialog");
                      const $btns = $dialog.find(".ui-dialog-buttonset button");
                      $btns
                          .addClass("btn btn-danger btn-sm")
                          .html('<i class="bi bi-x-circle me-1"></i> Close');

                      $dialog.find(".ui-dialog-titlebar-close")
                          .show()
                          .removeClass()
                          .addClass("ui-dialog-titlebar-close btn-close")
                          .html("&times;");
                  },
                  buttons: {
                      Close: function () {
                          $(this).dialog("close");
                      }
                  }
              });

          } else if (isDuplicate) {
              // Show duplicate dialog
              $("<div title='Duplicate Entry'><p class='text-danger mb-0'>Name or Email already exists.</p></div>").dialog({
                  title: "Duplicate Entry",
                  modal: true,
                  open: function () {
                      const $dialog = $(this).closest(".ui-dialog");
                      const $btns = $dialog.find(".ui-dialog-buttonset button");
                      $btns
                          .addClass("btn btn-danger btn-sm")
                          .html('<i class="bi bi-x-circle me-1"></i> Close');

                      $dialog.find(".ui-dialog-titlebar-close")
                          .show()
                          .removeClass()
                          .addClass("ui-dialog-titlebar-close btn-close")
                          .html("&times;");
                  },
                  buttons: {
                      Error: function () {
                          $(this).dialog("close");
                      }
                  }
              });
          } else {
              fakeData.push({ name, email });
              renderTable(fakeData);
              $("#name").val("");
              $("#email").val("");

              // Show success dialog
              $("<div title='Success'><p class='text-success mb-0'>Contact saved successfully.</p></div>").dialog({
                  title: "Success",
                  modal: true,
                  open: function () {
                      const $dialog = $(this).closest(".ui-dialog");
                      const $btns = $dialog.find(".ui-dialog-buttonset button");
                      $btns
                          .addClass("btn btn-success btn-sm")
                          .html('<i class="bi bi-check-circle me-1"></i> OK');

                      $dialog.find(".ui-dialog-titlebar-close")
                          .show()
                          .removeClass()
                          .addClass("ui-dialog-titlebar-close btn-close")
                          .html("&times;");
                  },
                  buttons: {
                      OK: function () {
                          $(this).dialog("close");
                      }
                  }
              });
          }
      });


      $("#contacts-table").on("click", ".delete-btn", function () {
          const row = $(this).closest("tr");
          const index = row.index();

          $("<div><p class='mb-0'>Are you sure you want to delete this contact?</p></div>").dialog({
              title: "Confirm Deletion",
              modal: true,
              open: function () {
                  const $dialog = $(this).closest(".ui-dialog");

                  const $buttons = $dialog.find(".ui-dialog-buttonset button");
                  $buttons.eq(0)
                      .addClass("btn btn-danger btn-sm")
                      .html('<i class="bi bi-trash me-1"></i> Yes');
                  $buttons.eq(1)
                      .addClass("btn btn-secondary btn-sm")
                      .html('<i class="bi bi-x-circle me-1"></i> No');

                  const $closeBtn = $dialog.find(".ui-dialog-titlebar-close");
                  $closeBtn
                      .show()
                      .removeClass()
                      .addClass("ui-dialog-titlebar-close btn-close")
                      .html("&times;");
              },
              buttons: {
                  Yes: function () {
                      fakeData.splice(index, 1);
                      renderTable(fakeData);
                      $(this).dialog("close");
                  },
                  No: function () {
                      $(this).dialog("close");
                  }
              }
          });
      });

  });