# VkInstanceCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInstanceCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInstanceCreateInfo - Structure specifying parameters of a newly created instance

The `VkInstanceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkInstanceCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkInstanceCreateFlags       flags;
    const VkApplicationInfo*    pApplicationInfo;
    uint32_t                    enabledLayerCount;
    const char* const*          ppEnabledLayerNames;
    uint32_t                    enabledExtensionCount;
    const char* const*          ppEnabledExtensionNames;
} VkInstanceCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkInstanceCreateFlagBits](VkInstanceCreateFlagBits.html) indicating
the behavior of the instance.

* 
`pApplicationInfo` is `NULL` or a pointer to a
`VkApplicationInfo` structure.
If not `NULL`, this information helps implementations recognize behavior
inherent to classes of applications.
[VkApplicationInfo](VkApplicationInfo.html) is defined in detail below.

* 
`enabledLayerCount` is the number of global layers to enable.

* 
`ppEnabledLayerNames` is a pointer to an array of
`enabledLayerCount` null-terminated UTF-8 strings containing the
names of layers to enable for the created instance.
The layers are loaded in the order they are listed in this array, with
the first array element being the closest to the application, and the
last array element being the closest to the driver.
See the [Layers](../../../../spec/latest/chapters/extensions.html#extendingvulkan-layers) section for further details.

* 
`enabledExtensionCount` is the number of global extensions to
enable.

* 
`ppEnabledExtensionNames` is a pointer to an array of
`enabledExtensionCount` null-terminated UTF-8 strings containing the
names of extensions to enable.

To capture events that occur while creating or destroying an instance, an
application **can** link a
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html) structure
or a
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html) structure
to the `pNext` chain of the `VkInstanceCreateInfo` structure passed
to `vkCreateInstance`.
This callback is only valid for the duration of the [vkCreateInstance](vkCreateInstance.html)
and the [vkDestroyInstance](vkDestroyInstance.html) call.
Use
[vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html)
or
[vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html)
to create persistent callback objects.

An application can add additional drivers by including the
[VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html) structure in the `pNext` chain of
the `VkInstanceCreateInfo` structure passed to `vkCreateInstance`.

|  | [VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html) allows applications to ship drivers
| --- | --- |
with themselves.
Only drivers that are designed to work with it should be used, such as
drivers that implement Vulkan in software or that implement Vulkan by
translating it to a different API.
Any driver that requires installation should not be used, such as hardware
drivers. |

Valid Usage

* 
[](#VUID-VkInstanceCreateInfo-pNext-04925) VUID-VkInstanceCreateInfo-pNext-04925

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
`[VK_EXT_debug_report](VK_EXT_debug_report.html)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-04926) VUID-VkInstanceCreateInfo-pNext-04926

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
`[VK_EXT_debug_utils](VK_EXT_debug_utils.html)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-06779) VUID-VkInstanceCreateInfo-pNext-06779

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be either
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) or
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

* 
[](#VUID-VkInstanceCreateInfo-flags-06559) VUID-VkInstanceCreateInfo-flags-06559

If `flags` has the
[VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR](VkInstanceCreateFlagBits.html) bit set, the list
of enabled extensions in `ppEnabledExtensionNames` **must** contain
`[VK_KHR_portability_enumeration](VK_KHR_portability_enumeration.html)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-09400) VUID-VkInstanceCreateInfo-pNext-09400

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
[VK_LUNARG_direct_driver_loading](VK_LUNARG_direct_driver_loading.html)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10242) VUID-VkInstanceCreateInfo-pNext-10242

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
[VK_EXT_layer_settings](VK_EXT_layer_settings.html)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10243) VUID-VkInstanceCreateInfo-pNext-10243

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkValidationFeaturesEXT](VkValidationFeaturesEXT.html) structure, the list of enabled extensions
in `ppEnabledExtensionNames` **must** contain
[VK_EXT_validation_features](VK_EXT_validation_features.html)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10244) VUID-VkInstanceCreateInfo-pNext-10244

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkValidationFlagsEXT](VkValidationFlagsEXT.html) structure, the list of enabled extensions in
`ppEnabledExtensionNames` **must** contain
[VK_EXT_validation_flags](VK_EXT_validation_flags.html)

Valid Usage (Implicit)

* 
[](#VUID-VkInstanceCreateInfo-sType-sType) VUID-VkInstanceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkInstanceCreateInfo-pNext-pNext) VUID-VkInstanceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html), [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html), [VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html), [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html), [VkValidationFeaturesEXT](VkValidationFeaturesEXT.html), or [VkValidationFlagsEXT](VkValidationFlagsEXT.html)

* 
[](#VUID-VkInstanceCreateInfo-sType-unique) VUID-VkInstanceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html), [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), or [VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html)

* 
[](#VUID-VkInstanceCreateInfo-flags-parameter) VUID-VkInstanceCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkInstanceCreateFlagBits](VkInstanceCreateFlagBits.html) values

* 
[](#VUID-VkInstanceCreateInfo-pApplicationInfo-parameter) VUID-VkInstanceCreateInfo-pApplicationInfo-parameter

 If `pApplicationInfo` is not `NULL`, `pApplicationInfo` **must** be a valid pointer to a valid [VkApplicationInfo](VkApplicationInfo.html) structure

* 
[](#VUID-VkInstanceCreateInfo-ppEnabledLayerNames-parameter) VUID-VkInstanceCreateInfo-ppEnabledLayerNames-parameter

 If `enabledLayerCount` is not `0`, `ppEnabledLayerNames` **must** be a valid pointer to an array of `enabledLayerCount` null-terminated UTF-8 strings

* 
[](#VUID-VkInstanceCreateInfo-ppEnabledExtensionNames-parameter) VUID-VkInstanceCreateInfo-ppEnabledExtensionNames-parameter

 If `enabledExtensionCount` is not `0`, `ppEnabledExtensionNames` **must** be a valid pointer to an array of `enabledExtensionCount` null-terminated UTF-8 strings

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkApplicationInfo](VkApplicationInfo.html), [VkInstanceCreateFlags](VkInstanceCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateInstance](vkCreateInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkInstanceCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
