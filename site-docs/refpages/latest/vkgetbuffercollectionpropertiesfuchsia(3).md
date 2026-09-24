# vkGetBufferCollectionPropertiesFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferCollectionPropertiesFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferCollectionPropertiesFUCHSIA - Retrieve properties from a buffer collection

After constraints have been set on the buffer collection by calling
[vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html) or
[vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html), call
`vkGetBufferCollectionPropertiesFUCHSIA` to retrieve the negotiated and
finalized properties of the buffer collection.

The call to `vkGetBufferCollectionPropertiesFUCHSIA` is synchronous.
It waits for the Sysmem format negotiation and buffer collection allocation
to complete before returning.

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkGetBufferCollectionPropertiesFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    VkBufferCollectionPropertiesFUCHSIA*        pProperties);

* 
`device` is the logical device handle

* 
`collection` is the [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
`pProperties` is a pointer to the retrieved
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html) struct

For image-based buffer collections, upon calling
`vkGetBufferCollectionPropertiesFUCHSIA`, Sysmem will choose an element
of the [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html)::`pImageCreateInfos`
established by the preceding call to
[vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html).
The index of the element chosen is stored in and can be retrieved from
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)::`createInfoIndex`.

For buffer-based buffer collections, a single [VkBufferCreateInfo](VkBufferCreateInfo.html) is
specified as [VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html)::`createInfo`.
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)::`createInfoIndex` will
therefore always be zero.

`vkGetBufferCollectionPropertiesFUCHSIA` **may** fail if Sysmem is unable
to resolve the constraints of all of the participants in the buffer
collection.
If that occurs, `vkGetBufferCollectionPropertiesFUCHSIA` will return
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

Valid Usage

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-None-06405) VUID-vkGetBufferCollectionPropertiesFUCHSIA-None-06405

Prior to calling [vkGetBufferCollectionPropertiesFUCHSIA](#), the
constraints on the buffer collection **must** have been set by either
[vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html) or
[vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-device-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-pProperties-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html) structure

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parent) VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetBufferCollectionPropertiesFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
