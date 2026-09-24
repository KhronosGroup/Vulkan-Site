# vkGetGpaSessionResultsAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetGpaSessionResultsAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetGpaSessionResultsAMD - Getting the status of a GPA session

Once a GPA session’s results are available, they can be obtained by:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaSessionResultsAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession,
    uint32_t                                    sampleID,
    size_t*                                     pSizeInBytes,
    void*                                       pData);

* 
`device` is the logical device used to create the GPA session.

* 
`gpaSession` is the session whose results are queried.

* 
`sampleID` is the sample ID, returned by
[vkCmdBeginGpaSampleAMD](vkCmdBeginGpaSampleAMD.html), whose results are to be queried.

* 
`pSizeInBytes` is a pointer to a `size_t` value related to the
size of the results data, as described below.

* 
`pData` is either `NULL` or a pointer to an array of
`pSizeInBytes` bytes where the results will be written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaSessionResultsAMD-device-parameter) VUID-vkGetGpaSessionResultsAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetGpaSessionResultsAMD-gpaSession-parameter) VUID-vkGetGpaSessionResultsAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkGetGpaSessionResultsAMD-pSizeInBytes-parameter) VUID-vkGetGpaSessionResultsAMD-pSizeInBytes-parameter

 `pSizeInBytes` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetGpaSessionResultsAMD-pData-parameter) VUID-vkGetGpaSessionResultsAMD-pData-parameter

 If the value referenced by `pSizeInBytes` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pSizeInBytes` bytes

* 
[](#VUID-vkGetGpaSessionResultsAMD-gpaSession-parent) VUID-vkGetGpaSessionResultsAMD-gpaSession-parent

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkGetGpaSessionResultsAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
