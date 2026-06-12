# vkSetPrivateData(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetPrivateData.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetPrivateData - Associate data with a Vulkan object

To store application-defined data in a slot associated with a Vulkan object,
call:

// Provided by VK_VERSION_1_3
VkResult vkSetPrivateData(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t                                    data);

// Provided by VK_EXT_private_data
// Equivalent to vkSetPrivateData
VkResult vkSetPrivateDataEXT(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t                                    data);

* 
`device` is the device that created the object.

* 
`objectType` is a [VkObjectType](VkObjectType.html) specifying the type of object
to associate data with.

* 
`objectHandle` is a handle to the object to associate data with.

* 
`privateDataSlot` is a handle to a [VkPrivateDataSlot](VkPrivateDataSlot.html)
specifying location of private data storage.

* 
`data` is application-defined data to associate the object with.
This data will be stored at `privateDataSlot`.

Valid Usage

* 
[](#VUID-vkSetPrivateData-objectHandle-04016) VUID-vkSetPrivateData-objectHandle-04016

`objectHandle` **must** be `device` or a child of `device`

* 
[](#VUID-vkSetPrivateData-objectHandle-04017) VUID-vkSetPrivateData-objectHandle-04017

`objectHandle` **must** be a valid handle to an object of type
`objectType`

Valid Usage (Implicit)

* 
[](#VUID-vkSetPrivateData-device-parameter) VUID-vkSetPrivateData-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetPrivateData-objectType-parameter) VUID-vkSetPrivateData-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](VkObjectType.html) value

* 
[](#VUID-vkSetPrivateData-privateDataSlot-parameter) VUID-vkSetPrivateData-privateDataSlot-parameter

 `privateDataSlot` **must** be a valid [VkPrivateDataSlot](VkPrivateDataSlot.html) handle

* 
[](#VUID-vkSetPrivateData-privateDataSlot-parent) VUID-vkSetPrivateData-privateDataSlot-parent

 `privateDataSlot` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDevice](VkDevice.html), [VkObjectType](VkObjectType.html), [VkPrivateDataSlot](VkPrivateDataSlot.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#vkSetPrivateData).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
