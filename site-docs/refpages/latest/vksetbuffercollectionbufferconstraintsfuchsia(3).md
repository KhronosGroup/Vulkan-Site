# vkSetBufferCollectionBufferConstraintsFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetBufferCollectionBufferConstraintsFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetBufferCollectionBufferConstraintsFUCHSIA - Set buffer-based constraints for a buffer collection

To set the constraints on a [VkBuffer](VkBuffer.html) buffer collection, call:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkSetBufferCollectionBufferConstraintsFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkBufferConstraintsInfoFUCHSIA*       pBufferConstraintsInfo);

* 
`device` is the logical device

* 
`collection` is the [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
`pBufferConstraintsInfo` is a pointer to a
[VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html) structure

`vkSetBufferCollectionBufferConstraintsFUCHSIA` **may** fail if the
implementation does not support the constraints specified in the
`bufferCollectionConstraints` structure.
If that occurs, [vkSetBufferCollectionBufferConstraintsFUCHSIA](#) will
return [VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html).

Valid Usage

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-06403) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-06403

`vkSetBufferCollectionImageConstraintsFUCHSIA` or
`vkSetBufferCollectionBufferConstraintsFUCHSIA` **must** not have
already been called on `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-device-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-pBufferConstraintsInfo-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-pBufferConstraintsInfo-parameter

 `pBufferConstraintsInfo` **must** be a valid pointer to a valid [VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html) structure

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parent) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parent

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

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkSetBufferCollectionBufferConstraintsFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
