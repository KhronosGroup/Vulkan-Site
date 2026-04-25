# vkSetBufferCollectionImageConstraintsFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetBufferCollectionImageConstraintsFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetBufferCollectionImageConstraintsFUCHSIA - Set image-based constraints for a buffer collection

Setting the constraints on the buffer collection initiates the format
negotiation and allocation of the buffer collection.
To set the constraints on a [VkImage](VkImage.html) buffer collection, call:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkSetBufferCollectionImageConstraintsFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkImageConstraintsInfoFUCHSIA*        pImageConstraintsInfo);

* 
`device` is the logical device

* 
`collection` is the [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
`pImageConstraintsInfo` is a pointer to a
[VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html) structure

`vkSetBufferCollectionImageConstraintsFUCHSIA` **may** fail if
`pImageConstraintsInfo->formatConstraintsCount` is larger than the
implementation-defined limit.
If that occurs, [vkSetBufferCollectionImageConstraintsFUCHSIA](#) will
return [VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

`vkSetBufferCollectionImageConstraintsFUCHSIA` **may** fail if the
implementation does not support any of the formats described by the
`pImageConstraintsInfo` structure.
If that occurs, [vkSetBufferCollectionImageConstraintsFUCHSIA](#) will
return [VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html).

Valid Usage

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-06394) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-06394

`vkSetBufferCollectionImageConstraintsFUCHSIA` or
`vkSetBufferCollectionBufferConstraintsFUCHSIA` **must** not have
already been called on `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-device-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-pImageConstraintsInfo-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-pImageConstraintsInfo-parameter

 `pImageConstraintsInfo` **must** be a valid pointer to a valid [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html) structure

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parent) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkDevice](VkDevice.html), [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkSetBufferCollectionImageConstraintsFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
