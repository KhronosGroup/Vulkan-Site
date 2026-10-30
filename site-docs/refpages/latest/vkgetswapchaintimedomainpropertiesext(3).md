# vkGetSwapchainTimeDomainPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSwapchainTimeDomainPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSwapchainTimeDomainPropertiesEXT - Obtain the time domains supported by the PE for the swapchain

The implementation maintains an internal monotonically increasing counter
which updates when the presentation engine’s list of supported time domains
for a swapchain is modified.

To query the time domains supported by the presentation engine for a given
swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetSwapchainTimeDomainPropertiesEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSwapchainTimeDomainPropertiesEXT*         pSwapchainTimeDomainProperties,
    uint64_t*                                   pTimeDomainsCounter);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain time domain properties for.

* 
`pSwapchainTimeDomainProperties` is a pointer to an instance of the
[VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html) structure.

* 
`pTimeDomainsCounter` is `NULL` or a pointer to a 64-bit unsigned
integer set by the implementation to the current value of the
swapchain’s internal time domain properties counter.

If upon return
[VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html)::`timeDomainCount` is smaller
than the number of time domains supported for the given `swapchain`,
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html) to indicate
that not all the available values were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-device-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-pSwapchainTimeDomainProperties-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-pSwapchainTimeDomainProperties-parameter

 `pSwapchainTimeDomainProperties` **must** be a valid pointer to a [VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html) structure

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-pTimeDomainsCounter-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-pTimeDomainsCounter-parameter

 If `pTimeDomainsCounter` is not `NULL`, `pTimeDomainsCounter` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parent) VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html), [VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetSwapchainTimeDomainPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
