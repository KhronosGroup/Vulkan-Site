# vkGetPrivateData(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPrivateData.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPrivateData - Retrieve data associated with a Vulkan object

To retrieve application-defined data from a slot associated with a Vulkan
object, call:

// Provided by VK_VERSION_1_3
void vkGetPrivateData(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t*                                   pData);

// Provided by VK_EXT_private_data
// Equivalent to vkGetPrivateData
void vkGetPrivateDataEXT(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t*                                   pData);

* 
`device` is the device that created the object

* 
`objectType` is a [VkObjectType](VkObjectType.html) specifying the type of object
data is associated with.

* 
`objectHandle` is a handle to the object data is associated with.

* 
`privateDataSlot` is a handle to a [VkPrivateDataSlot](VkPrivateDataSlot.html)
specifying location of private data pointer storage.

* 
`pData` is a pointer to specify where application-defined data is
returned.
`0` will be written in the absence of a previous call to
`vkSetPrivateData` using the object specified by `objectHandle`.

|  | Due to platform details on Android, implementations might not be able to
| --- | --- |
reliably return `0` from calls to `vkGetPrivateData` for
[VkSwapchainKHR](VkSwapchainKHR.html) objects on which `vkSetPrivateData` has not
previously been called.
This erratum is exclusive to the Android platform and objects of type
[VkSwapchainKHR](VkSwapchainKHR.html). |

Valid Usage

* 
[](#VUID-vkGetPrivateData-objectType-04018) VUID-vkGetPrivateData-objectType-04018

`objectHandle` **must** be `device` or a child of `device`

* 
[](#VUID-vkGetPrivateData-objectHandle-09498) VUID-vkGetPrivateData-objectHandle-09498

`objectHandle` **must** be a valid handle to an object of type
`objectType`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPrivateData-device-parameter) VUID-vkGetPrivateData-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPrivateData-objectType-parameter) VUID-vkGetPrivateData-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](VkObjectType.html) value

* 
[](#VUID-vkGetPrivateData-privateDataSlot-parameter) VUID-vkGetPrivateData-privateDataSlot-parameter

 `privateDataSlot` **must** be a valid [VkPrivateDataSlot](VkPrivateDataSlot.html) handle

* 
[](#VUID-vkGetPrivateData-pData-parameter) VUID-vkGetPrivateData-pData-parameter

 `pData` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetPrivateData-privateDataSlot-parent) VUID-vkGetPrivateData-privateDataSlot-parent

 `privateDataSlot` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDevice](VkDevice.html), [VkObjectType](VkObjectType.html), [VkPrivateDataSlot](VkPrivateDataSlot.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#vkGetPrivateData).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
