# vkGetGpaSessionStatusAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetGpaSessionStatusAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetGpaSessionStatusAMD - Getting the status of a GPA session

Once a GPA session has ended, its status can be queried by:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaSessionStatusAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession);

* 
`device` is the logical device that sets the clocks.

* 
`gpaSession` is the session whose status is queried.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaSessionStatusAMD-device-parameter) VUID-vkGetGpaSessionStatusAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetGpaSessionStatusAMD-gpaSession-parameter) VUID-vkGetGpaSessionStatusAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkGetGpaSessionStatusAMD-gpaSession-parent) VUID-vkGetGpaSessionStatusAMD-gpaSession-parent

 `gpaSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkDevice](VkDevice.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkGetGpaSessionStatusAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
