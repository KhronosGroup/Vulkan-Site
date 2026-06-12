# VkDeviceAddressBindingCallbackDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceAddressBindingCallbackDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceAddressBindingCallbackDataEXT - Structure specifying parameters returned to the callback

The definition of `VkDeviceAddressBindingCallbackDataEXT` is:

// Provided by VK_EXT_device_address_binding_report
typedef struct VkDeviceAddressBindingCallbackDataEXT {
    VkStructureType                   sType;
    void*                             pNext;
    VkDeviceAddressBindingFlagsEXT    flags;
    VkDeviceAddress                   baseAddress;
    VkDeviceSize                      size;
    VkDeviceAddressBindingTypeEXT     bindingType;
} VkDeviceAddressBindingCallbackDataEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDeviceAddressBindingFlagBitsEXT](VkDeviceAddressBindingFlagBitsEXT.html)
specifying additional information about the binding event that caused
the callback to be called.

* 
`baseAddress` is a GPU-accessible virtual address identifying the
start of a region of the virtual address space associated with a Vulkan
object, as identified by the `pObjects` member of
[VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html).

* 
`size` is the size in bytes of a region of GPU-accessible virtual
address space.

* 
`bindingType` is a [VkDeviceAddressBindingTypeEXT](VkDeviceAddressBindingTypeEXT.html) specifying
the type of binding event that caused the callback to be called.

If the [`reportAddressBinding`](../../../../spec/latest/chapters/features.html#features-reportAddressBinding) feature
is enabled and the implementation binds or unbinds a region of virtual
address space associated with a Vulkan object, the implementation **must**
submit a debug message with the following properties:

* 
`messageSeverity` equal to
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html)

* 
`messageTypes` equal to
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](VkDebugUtilsMessageTypeFlagBitsEXT.html)

* 
`VkDebugUtilsMessengerCallbackDataEXT`::`pObjects` **must**
identify the associated Vulkan object

* 
`VkDeviceAddressBindingCallbackDataEXT` **must** be included in the
`pNext` chain of `VkDebugUtilsMessengerCallbackDataEXT`

These debug messages **must** be emitted both for GPU virtual address space
regions that are explicitly bound to a Vulkan object via the
`vkBind`*Memory/`vkBind`*Memory2 functions, and for those that are
implicitly generated via memory allocation or importing external memory.

An implementation **may** report binding events associated with a Vulkan object
via `VkDebugUtilsMessengerEXT` prior to the object becoming visible to
an application via other Vulkan commands.
For example, object creation functions **may** report binding events that occur
during an objects creation.
In such cases, `VkDeviceAddressBindingCallbackDataEXT`::`flags`
**must** include [VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT](VkDeviceAddressBindingFlagBitsEXT.html).

Object handles reported in this manner are not
[valid object handles](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-handles), and **must** not be
used as an input parameter to any Vulkan command.

Any valid object handle returned by an object creation function **must** match
the handle specified via any previously reported binding events associated
with the object’s creation.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-sType-sType) VUID-VkDeviceAddressBindingCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_ADDRESS_BINDING_CALLBACK_DATA_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-flags-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceAddressBindingFlagBitsEXT](VkDeviceAddressBindingFlagBitsEXT.html) values

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-baseAddress-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-baseAddress-parameter

 `baseAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-bindingType-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-bindingType-parameter

 `bindingType` **must** be a valid [VkDeviceAddressBindingTypeEXT](VkDeviceAddressBindingTypeEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html)

[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html), `VkDeviceAddress`, [VkDeviceAddressBindingFlagsEXT](VkDeviceAddressBindingFlagsEXT.html), [VkDeviceAddressBindingTypeEXT](VkDeviceAddressBindingTypeEXT.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceAddressBindingCallbackDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
