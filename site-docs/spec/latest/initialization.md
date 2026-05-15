# Initialization

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/initialization.html

## Table of Contents

- [Command Function Pointers](#initialization-functionpointers)
- [Command_Function_Pointers](#initialization-functionpointers)
- [Extending Physical Device Core Functionality](#_extending_physical_device_core_functionality)
- [Extending_Physical_Device_Core_Functionality](#_extending_physical_device_core_functionality)
- [Extending Physical Device From Device Extensions](#initialization-phys-dev-extensions)
- [Extending_Physical_Device_From_Device_Extensions](#initialization-phys-dev-extensions)
- [Instances](#initialization-instances)

## Content

Before using Vulkan, an application **must** initialize it by loading the
Vulkan commands, and creating a `VkInstance` object.

Vulkan commands are not necessarily exposed by static linking on a platform.
Commands to query function pointers for Vulkan commands are described below.

|  | When extensions are [promoted](extensions.html#extendingvulkan-compatibility-promotion) or
| --- | --- |
otherwise incorporated into another extension or Vulkan core version,
command [aliases](extensions.html#extendingvulkan-compatibility-aliases) may be included.
Whilst the behavior of each command alias is identical, the behavior of
retrieving each alias’s function pointer is not.
A function pointer for a given alias can only be retrieved if the extension
or version that introduced that alias is supported and enabled, irrespective
of whether any other alias is available. |

Function pointers for all Vulkan commands **can** be obtained by calling:

// Provided by VK_VERSION_1_0
PFN_vkVoidFunction vkGetInstanceProcAddr(
    VkInstance                                  instance,
    const char*                                 pName);

* 
`instance` is the instance that the function pointer will be
compatible with, or `NULL` for commands not dependent on any instance.

* 
`pName` is the name of the command to obtain.

`vkGetInstanceProcAddr` itself is obtained in a platform- and loader-
specific manner.
Typically, the loader library will export this command as a function symbol,
so applications **can** link against the loader library, or load it dynamically
and look up the symbol using platform-specific APIs.

The table below defines the various use cases for
`vkGetInstanceProcAddr` and expected return value (“fp” is “function
pointer”) for each case.
A valid returned function pointer (“fp”) **must** not be `NULL`.

The returned function pointer is of type [PFN_vkVoidFunction](#PFN_vkVoidFunction), and **must**
be cast to the type of the command being queried before use.

| `instance` | `pName` | return value |
| --- | --- | --- |
| *1 | `NULL` | **undefined** |
| invalid non-`NULL` instance | *1 | **undefined** |
| `NULL` | *global command*2 | fp |
| `NULL` | [vkGetInstanceProcAddr](#vkGetInstanceProcAddr) | fp5 |
| instance | [vkGetInstanceProcAddr](#vkGetInstanceProcAddr) | fp |
| instance | core *dispatchable command* | fp3 |
| instance | enabled instance extension dispatchable command for `instance` | fp3 |
| instance | available device extension4 dispatchable command for `instance` | fp3 |
| any other case, not covered above | `NULL` |

1

"*" means any representable value for the parameter (including valid
values, invalid values, and `NULL`).

2

    The global commands are:
[vkEnumerateInstanceVersion](#vkEnumerateInstanceVersion),
    [vkEnumerateInstanceExtensionProperties](extensions.html#vkEnumerateInstanceExtensionProperties),
    [vkEnumerateInstanceLayerProperties](extensions.html#vkEnumerateInstanceLayerProperties), and [vkCreateInstance](#vkCreateInstance).
    Dispatchable commands are all other commands which are not global.

3

The returned function pointer **must** only be called with a dispatchable
object (the first parameter) that is `instance` or a child of
`instance`, e.g. [VkInstance](#VkInstance), [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice),
[VkDevice](devsandqueues.html#VkDevice), [VkQueue](devsandqueues.html#VkQueue), or [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer).

4

An “available device extension” is a device extension supported by any
physical device enumerated by `instance`.

5

Starting with Vulkan 1.2,
    `vkGetInstanceProcAddr` can resolve itself with a `NULL` instance
    pointer.

Valid Usage (Implicit)

* 
[](#VUID-vkGetInstanceProcAddr-instance-parameter) VUID-vkGetInstanceProcAddr-instance-parameter

 If `instance` is not `NULL`, `instance` **must** be a valid [VkInstance](#VkInstance) handle

* 
[](#VUID-vkGetInstanceProcAddr-pName-parameter) VUID-vkGetInstanceProcAddr-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

In order to support systems with multiple Vulkan implementations, the
function pointers returned by [vkGetInstanceProcAddr](#vkGetInstanceProcAddr) **may** point to
dispatch code that calls a different real implementation for different
[VkDevice](devsandqueues.html#VkDevice) objects or their child objects.
The overhead of the internal dispatch for [VkDevice](devsandqueues.html#VkDevice) objects can be
avoided by obtaining device-specific function pointers for any commands that
use a device or device-child object as their dispatchable object.
Such function pointers **can** be obtained by calling:

// Provided by VK_VERSION_1_0
PFN_vkVoidFunction vkGetDeviceProcAddr(
    VkDevice                                    device,
    const char*                                 pName);

The table below defines the various use cases for `vkGetDeviceProcAddr`
and expected return value (“fp” is “function pointer”) for each case.
A valid returned function pointer (“fp”) **must** not be `NULL`.

The returned function pointer is of type [PFN_vkVoidFunction](#PFN_vkVoidFunction), and **must**
be cast to the type of the command being queried before use.
The function pointer **must** only be called with a dispatchable object (the
first parameter) that is `device` or a child of `device`.

| `device` | `pName` | return value |
| --- | --- | --- |
| `NULL` | *1 | **undefined** |
| invalid device | *1 | **undefined** |
| device | `NULL` | **undefined** |
| device | requested core version2 device-level dispatchable command3 | fp4 |
| device | enabled extension device-level dispatchable command3 | fp4 |
| any other case, not covered above | `NULL` |

1

"*" means any representable value for the parameter (including valid
values, invalid values, and `NULL`).

2

Device-level commands which are part of the core version specified by
[VkApplicationInfo](#VkApplicationInfo)::`apiVersion` when creating the instance
will always return a valid function pointer.
If the [`maintenance5`](features.html#features-maintenance5) feature is enabled,
core commands beyond that version which are supported by the
implementation will return `NULL`, otherwise the implementation **may**
either return `NULL` or a function pointer.
If a function pointer is returned, it **must** not be called.

3

In this function, device-level excludes all physical-device-level
commands.

4

The returned function pointer **must** only be called with a dispatchable
object (the first parameter) that is `device` or a child of
`device` e.g. [VkDevice](devsandqueues.html#VkDevice), [VkQueue](devsandqueues.html#VkQueue), or
[VkCommandBuffer](cmdbuffers.html#VkCommandBuffer).

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceProcAddr-device-parameter) VUID-vkGetDeviceProcAddr-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceProcAddr-pName-parameter) VUID-vkGetDeviceProcAddr-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

The definition of [PFN_vkVoidFunction](#PFN_vkVoidFunction) is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkVoidFunction)(void);

This type is returned from command function pointer queries, and **must** be
cast to an actual command function pointer before use.

New core physical-device-level functionality **can** be used when both
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` and
[VkApplicationInfo](#VkApplicationInfo)::`apiVersion` are greater than or equal to the
version of Vulkan that added the new functionality.
The Vulkan version supported by a physical device **can** be obtained by
calling [vkGetPhysicalDeviceProperties](devsandqueues.html#vkGetPhysicalDeviceProperties).

When the `[VK_KHR_get_physical_device_properties2](../appendices/extensions.html#VK_KHR_get_physical_device_properties2)` extension is
enabled,
or when both the instance and the physical-device versions are at least 1.1,
physical-device-level functionality of a device extension **can** be used with
a physical device if the corresponding extension is enumerated by
[vkEnumerateDeviceExtensionProperties](extensions.html#vkEnumerateDeviceExtensionProperties) for that physical device, even
before a logical device has been created.

To obtain a function pointer for a physical-device-level command from a
device extension, an application **can** use [vkGetInstanceProcAddr](#vkGetInstanceProcAddr).
This function pointer **may** point to dispatch code, which calls a different
real implementation for different `VkPhysicalDevice` objects.
Applications **must** not use a [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) in any command added by
an extension or core version that is not supported by that physical device.

Device extensions **may** define structures that **can** be added to the
`pNext` chain of physical-device-level commands.

There is no global state in Vulkan and all per-application state is stored
in a `VkInstance` object.
Creating a `VkInstance` object initializes the Vulkan library and allows
the application to pass information about itself to the implementation.

Instances are represented by `VkInstance` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkInstance)

To query the version of instance-level functionality supported by the
implementation, call:

// Provided by VK_VERSION_1_1
VkResult vkEnumerateInstanceVersion(
    uint32_t*                                   pApiVersion);

* 
`pApiVersion` is a pointer to a `uint32_t`, which is the version
of Vulkan supported by instance-level functionality, encoded as
described in [Version Numbers](extensions.html#extendingvulkan-coreversions-versionnumbers).

|  | The intended behavior of [vkEnumerateInstanceVersion](#vkEnumerateInstanceVersion) is that an
| --- | --- |
implementation **should** not need to perform memory allocations and **should**
unconditionally return [VK_SUCCESS](fundamentals.html#VkResult).
The loader, and any enabled layers, **may** return
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) in the case of a failed memory allocation. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceVersion-pApiVersion-parameter) VUID-vkEnumerateInstanceVersion-pApiVersion-parameter

 `pApiVersion` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To create an instance object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateInstance(
    const VkInstanceCreateInfo*                 pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkInstance*                                 pInstance);

* 
`pCreateInfo` is a pointer to a [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure
controlling creation of the instance.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pInstance` points a [VkInstance](#VkInstance) handle in which the resulting
instance is returned.

`vkCreateInstance` verifies that the requested layers exist.
If not, `vkCreateInstance` will return [VK_ERROR_LAYER_NOT_PRESENT](fundamentals.html#VkResult).
Next `vkCreateInstance` verifies that the requested extensions are
supported (e.g. in the implementation or in any enabled instance layer) and
if any requested extension is not supported, `vkCreateInstance` **must**
return [VK_ERROR_EXTENSION_NOT_PRESENT](fundamentals.html#VkResult).
After verifying and enabling the instance layers and extensions the
`VkInstance` object is created and returned to the application.
If a requested extension is only supported by a layer, both the layer and
the extension need to be specified at `vkCreateInstance` time for the
creation to succeed.

Valid Usage

* 
[](#VUID-vkCreateInstance-ppEnabledExtensionNames-01388) VUID-vkCreateInstance-ppEnabledExtensionNames-01388

All [required    extensions](extensions.html#extendingvulkan-extensions-extensiondependencies) for each extension in the
[VkInstanceCreateInfo](#VkInstanceCreateInfo)::`ppEnabledExtensionNames` list **must**
also be present in that list

Valid Usage (Implicit)

* 
[](#VUID-vkCreateInstance-pCreateInfo-parameter) VUID-vkCreateInstance-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure

* 
[](#VUID-vkCreateInstance-pAllocator-parameter) VUID-vkCreateInstance-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateInstance-pInstance-parameter) VUID-vkCreateInstance-pInstance-parameter

 `pInstance` **must** be a valid pointer to a [VkInstance](#VkInstance) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](fundamentals.html#VkResult)

* 
[VK_ERROR_INCOMPATIBLE_DRIVER](fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_LAYER_NOT_PRESENT](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkInstanceCreateFlagBits](#VkInstanceCreateFlagBits) indicating
the behavior of the instance.

* 
`pApplicationInfo` is `NULL` or a pointer to a
`VkApplicationInfo` structure.
If not `NULL`, this information helps implementations recognize behavior
inherent to classes of applications.
[VkApplicationInfo](#VkApplicationInfo) is defined in detail below.

* 
`enabledLayerCount` is the number of global layers to enable.

* 
`ppEnabledLayerNames` is a pointer to an array of
`enabledLayerCount` null-terminated UTF-8 strings containing the
names of layers to enable for the created instance.
The layers are loaded in the order they are listed in this array, with
the first array element being the closest to the application, and the
last array element being the closest to the driver.
See the [Layers](extensions.html#extendingvulkan-layers) section for further details.

* 
`enabledExtensionCount` is the number of global extensions to
enable.

* 
`ppEnabledExtensionNames` is a pointer to an array of
`enabledExtensionCount` null-terminated UTF-8 strings containing the
names of extensions to enable.

To capture events that occur while creating or destroying an instance, an
application **can** link a
[VkDebugReportCallbackCreateInfoEXT](debugging.html#VkDebugReportCallbackCreateInfoEXT) structure
or a
[VkDebugUtilsMessengerCreateInfoEXT](debugging.html#VkDebugUtilsMessengerCreateInfoEXT) structure
to the `pNext` chain of the `VkInstanceCreateInfo` structure passed
to `vkCreateInstance`.
This callback is only valid for the duration of the [vkCreateInstance](#vkCreateInstance)
and the [vkDestroyInstance](#vkDestroyInstance) call.
Use
[vkCreateDebugReportCallbackEXT](debugging.html#vkCreateDebugReportCallbackEXT)
or
[vkCreateDebugUtilsMessengerEXT](debugging.html#vkCreateDebugUtilsMessengerEXT)
to create persistent callback objects.

An application can add additional drivers by including the
[VkDirectDriverLoadingListLUNARG](#VkDirectDriverLoadingListLUNARG) structure in the `pNext` chain of
the `VkInstanceCreateInfo` structure passed to `vkCreateInstance`.

|  | [VkDirectDriverLoadingListLUNARG](#VkDirectDriverLoadingListLUNARG) allows applications to ship drivers
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
[VkDebugReportCallbackCreateInfoEXT](debugging.html#VkDebugReportCallbackCreateInfoEXT) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
`[VK_EXT_debug_report](../appendices/extensions.html#VK_EXT_debug_report)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-04926) VUID-VkInstanceCreateInfo-pNext-04926

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkDebugUtilsMessengerCreateInfoEXT](debugging.html#VkDebugUtilsMessengerCreateInfoEXT) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
`[VK_EXT_debug_utils](../appendices/extensions.html#VK_EXT_debug_utils)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-06779) VUID-VkInstanceCreateInfo-pNext-06779

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be either
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT) or
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

* 
[](#VUID-VkInstanceCreateInfo-flags-06559) VUID-VkInstanceCreateInfo-flags-06559

If `flags` has the
[VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR](#VkInstanceCreateFlagBits) bit set, the list
of enabled extensions in `ppEnabledExtensionNames` **must** contain
`[VK_KHR_portability_enumeration](../appendices/extensions.html#VK_KHR_portability_enumeration)`

* 
[](#VUID-VkInstanceCreateInfo-pNext-09400) VUID-VkInstanceCreateInfo-pNext-09400

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkDirectDriverLoadingListLUNARG](#VkDirectDriverLoadingListLUNARG) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
[VK_LUNARG_direct_driver_loading](../appendices/extensions.html#VK_LUNARG_direct_driver_loading)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10242) VUID-VkInstanceCreateInfo-pNext-10242

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT) structure, the list of enabled
extensions in `ppEnabledExtensionNames` **must** contain
[VK_EXT_layer_settings](../appendices/extensions.html#VK_EXT_layer_settings)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10243) VUID-VkInstanceCreateInfo-pNext-10243

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkValidationFeaturesEXT](#VkValidationFeaturesEXT) structure, the list of enabled extensions
in `ppEnabledExtensionNames` **must** contain
[VK_EXT_validation_features](../appendices/extensions.html#VK_EXT_validation_features)

* 
[](#VUID-VkInstanceCreateInfo-pNext-10244) VUID-VkInstanceCreateInfo-pNext-10244

If the `pNext` chain of `VkInstanceCreateInfo` includes a
[VkValidationFlagsEXT](#VkValidationFlagsEXT) structure, the list of enabled extensions in
`ppEnabledExtensionNames` **must** contain
[VK_EXT_validation_flags](../appendices/extensions.html#VK_EXT_validation_flags)

Valid Usage (Implicit)

* 
[](#VUID-VkInstanceCreateInfo-sType-sType) VUID-VkInstanceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkInstanceCreateInfo-pNext-pNext) VUID-VkInstanceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugReportCallbackCreateInfoEXT](debugging.html#VkDebugReportCallbackCreateInfoEXT), [VkDebugUtilsMessengerCreateInfoEXT](debugging.html#VkDebugUtilsMessengerCreateInfoEXT), [VkDirectDriverLoadingListLUNARG](#VkDirectDriverLoadingListLUNARG), [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT), [VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT), [VkValidationFeaturesEXT](#VkValidationFeaturesEXT), or [VkValidationFlagsEXT](#VkValidationFlagsEXT)

* 
[](#VUID-VkInstanceCreateInfo-sType-unique) VUID-VkInstanceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDebugUtilsMessengerCreateInfoEXT](debugging.html#VkDebugUtilsMessengerCreateInfoEXT), [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT), or [VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT)

* 
[](#VUID-VkInstanceCreateInfo-flags-parameter) VUID-VkInstanceCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkInstanceCreateFlagBits](#VkInstanceCreateFlagBits) values

* 
[](#VUID-VkInstanceCreateInfo-pApplicationInfo-parameter) VUID-VkInstanceCreateInfo-pApplicationInfo-parameter

 If `pApplicationInfo` is not `NULL`, `pApplicationInfo` **must** be a valid pointer to a valid [VkApplicationInfo](#VkApplicationInfo) structure

* 
[](#VUID-VkInstanceCreateInfo-ppEnabledLayerNames-parameter) VUID-VkInstanceCreateInfo-ppEnabledLayerNames-parameter

 If `enabledLayerCount` is not `0`, `ppEnabledLayerNames` **must** be a valid pointer to an array of `enabledLayerCount` null-terminated UTF-8 strings

* 
[](#VUID-VkInstanceCreateInfo-ppEnabledExtensionNames-parameter) VUID-VkInstanceCreateInfo-ppEnabledExtensionNames-parameter

 If `enabledExtensionCount` is not `0`, `ppEnabledExtensionNames` **must** be a valid pointer to an array of `enabledExtensionCount` null-terminated UTF-8 strings

// Provided by VK_VERSION_1_0
typedef enum VkInstanceCreateFlagBits {
  // Provided by VK_KHR_portability_enumeration
    VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR = 0x00000001,
} VkInstanceCreateFlagBits;

* 
[VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR](#VkInstanceCreateFlagBits) specifies that
the instance will enumerate available Vulkan Portability-compliant
physical devices and groups in addition to the Vulkan physical devices
and groups that are enumerated by default.

// Provided by VK_VERSION_1_0
typedef VkFlags VkInstanceCreateFlags;

`VkInstanceCreateFlags` is a bitmask type for setting a mask of zero or
more [VkInstanceCreateFlagBits](#VkInstanceCreateFlagBits).

When creating a Vulkan instance for which you wish to disable validation
checks, add a [VkValidationFlagsEXT](#VkValidationFlagsEXT) structure to the `pNext` chain
of the [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure, specifying the checks to be
disabled.

// Provided by VK_EXT_validation_flags
typedef struct VkValidationFlagsEXT {
    VkStructureType                sType;
    const void*                    pNext;
    uint32_t                       disabledValidationCheckCount;
    const VkValidationCheckEXT*    pDisabledValidationChecks;
} VkValidationFlagsEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disabledValidationCheckCount` is the number of checks to disable.

* 
`pDisabledValidationChecks` is a pointer to an array of
[VkValidationCheckEXT](#VkValidationCheckEXT) values specifying the validation checks to be
disabled.

Valid Usage (Implicit)

* 
[](#VUID-VkValidationFlagsEXT-sType-sType) VUID-VkValidationFlagsEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_FLAGS_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkValidationFlagsEXT-pDisabledValidationChecks-parameter) VUID-VkValidationFlagsEXT-pDisabledValidationChecks-parameter

 `pDisabledValidationChecks` **must** be a valid pointer to an array of `disabledValidationCheckCount` valid [VkValidationCheckEXT](#VkValidationCheckEXT) values

* 
[](#VUID-VkValidationFlagsEXT-disabledValidationCheckCount-arraylength) VUID-VkValidationFlagsEXT-disabledValidationCheckCount-arraylength

 `disabledValidationCheckCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](#VkInstanceCreateInfo)

Possible values of elements of the
[VkValidationFlagsEXT](#VkValidationFlagsEXT)::`pDisabledValidationChecks` array,
specifying validation checks to be disabled, are:

// Provided by VK_EXT_validation_flags
typedef enum VkValidationCheckEXT {
    VK_VALIDATION_CHECK_ALL_EXT = 0,
    VK_VALIDATION_CHECK_SHADERS_EXT = 1,
} VkValidationCheckEXT;

* 
[VK_VALIDATION_CHECK_ALL_EXT](#VkValidationCheckEXT) specifies that all validation checks
are disabled.

* 
[VK_VALIDATION_CHECK_SHADERS_EXT](#VkValidationCheckEXT) specifies that shader validation
is disabled.

When creating a Vulkan instance for which you wish to enable or disable
specific validation features, add a [VkValidationFeaturesEXT](#VkValidationFeaturesEXT) structure
to the `pNext` chain of the [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure,
specifying the features to be enabled or disabled.

// Provided by VK_EXT_validation_features
typedef struct VkValidationFeaturesEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    uint32_t                                enabledValidationFeatureCount;
    const VkValidationFeatureEnableEXT*     pEnabledValidationFeatures;
    uint32_t                                disabledValidationFeatureCount;
    const VkValidationFeatureDisableEXT*    pDisabledValidationFeatures;
} VkValidationFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enabledValidationFeatureCount` is the number of features to enable.

* 
`pEnabledValidationFeatures` is a pointer to an array of
[VkValidationFeatureEnableEXT](#VkValidationFeatureEnableEXT) values specifying the validation
features to be enabled.

* 
`disabledValidationFeatureCount` is the number of features to
disable.

* 
`pDisabledValidationFeatures` is a pointer to an array of
[VkValidationFeatureDisableEXT](#VkValidationFeatureDisableEXT) values specifying the validation
features to be disabled.

Valid Usage

* 
[](#VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-02967) VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-02967

If the `pEnabledValidationFeatures` array contains
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT](#VkValidationFeatureEnableEXT),
then it **must** also contain
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT](#VkValidationFeatureEnableEXT) or
[VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT](#VkValidationFeatureEnableEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkValidationFeaturesEXT-sType-sType) VUID-VkValidationFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-parameter) VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-parameter

 If `enabledValidationFeatureCount` is not `0`, `pEnabledValidationFeatures` **must** be a valid pointer to an array of `enabledValidationFeatureCount` valid [VkValidationFeatureEnableEXT](#VkValidationFeatureEnableEXT) values

* 
[](#VUID-VkValidationFeaturesEXT-pDisabledValidationFeatures-parameter) VUID-VkValidationFeaturesEXT-pDisabledValidationFeatures-parameter

 If `disabledValidationFeatureCount` is not `0`, `pDisabledValidationFeatures` **must** be a valid pointer to an array of `disabledValidationFeatureCount` valid [VkValidationFeatureDisableEXT](#VkValidationFeatureDisableEXT) values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](#VkInstanceCreateInfo)

* 
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT)

* 
[VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo)

Possible values of elements of the
[VkValidationFeaturesEXT](#VkValidationFeaturesEXT)::`pEnabledValidationFeatures` array,
specifying validation features to be enabled, are:

// Provided by VK_EXT_validation_features
typedef enum VkValidationFeatureEnableEXT {
    VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT = 0,
    VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT = 1,
    VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT = 2,
    VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT = 3,
    VK_VALIDATION_FEATURE_ENABLE_SYNCHRONIZATION_VALIDATION_EXT = 4,
} VkValidationFeatureEnableEXT;

* 
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT](#VkValidationFeatureEnableEXT) specifies that
GPU-assisted validation is enabled.
Activating this feature instruments shader programs to generate
additional diagnostic data.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT](#VkValidationFeatureEnableEXT)
specifies that the validation layers reserve a descriptor set binding
slot for their own use.
The layer reports a value for
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxBoundDescriptorSets` that is one
less than the value reported by the device.
If the device supports the binding of only one descriptor set, the
validation layer does not perform GPU-assisted validation.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT](#VkValidationFeatureEnableEXT) specifies that
Vulkan best-practices validation is enabled.
Activating this feature enables the output of warnings related to common
misuse of the API, but which are not explicitly prohibited by the
specification.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT](#VkValidationFeatureEnableEXT) specifies that the
layers will process `debugPrintfEXT` operations in shaders and send
the resulting output to the debug callback.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_SYNCHRONIZATION_VALIDATION_EXT](#VkValidationFeatureEnableEXT)
specifies that Vulkan synchronization validation is enabled.
This feature reports resource access conflicts due to missing or
incorrect synchronization operations between actions (Draw, Copy,
Dispatch, Blit) reading or writing the same regions of memory.
This feature is disabled by default.

Possible values of elements of the
[VkValidationFeaturesEXT](#VkValidationFeaturesEXT)::`pDisabledValidationFeatures` array,
specifying validation features to be disabled, are:

// Provided by VK_EXT_validation_features
typedef enum VkValidationFeatureDisableEXT {
    VK_VALIDATION_FEATURE_DISABLE_ALL_EXT = 0,
    VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT = 1,
    VK_VALIDATION_FEATURE_DISABLE_THREAD_SAFETY_EXT = 2,
    VK_VALIDATION_FEATURE_DISABLE_API_PARAMETERS_EXT = 3,
    VK_VALIDATION_FEATURE_DISABLE_OBJECT_LIFETIMES_EXT = 4,
    VK_VALIDATION_FEATURE_DISABLE_CORE_CHECKS_EXT = 5,
    VK_VALIDATION_FEATURE_DISABLE_UNIQUE_HANDLES_EXT = 6,
    VK_VALIDATION_FEATURE_DISABLE_SHADER_VALIDATION_CACHE_EXT = 7,
} VkValidationFeatureDisableEXT;

* 
[VK_VALIDATION_FEATURE_DISABLE_ALL_EXT](#VkValidationFeatureDisableEXT) specifies that all
validation checks are disabled.

* 
[VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT](#VkValidationFeatureDisableEXT) specifies that shader
validation, both runtime and standalone, is disabled.
This validation occurs inside
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT) and
[VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo).
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_THREAD_SAFETY_EXT](#VkValidationFeatureDisableEXT) specifies that
thread safety validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_API_PARAMETERS_EXT](#VkValidationFeatureDisableEXT) specifies that
stateless parameter validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_OBJECT_LIFETIMES_EXT](#VkValidationFeatureDisableEXT) specifies that
object lifetime validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_CORE_CHECKS_EXT](#VkValidationFeatureDisableEXT) specifies that core
validation checks are disabled.
This feature is enabled by default.
If this feature is disabled,
[VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT](#VkValidationFeatureDisableEXT) is implied.

* 
[VK_VALIDATION_FEATURE_DISABLE_UNIQUE_HANDLES_EXT](#VkValidationFeatureDisableEXT) specifies that
protection against duplicate non-dispatchable object handles is
disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_SHADER_VALIDATION_CACHE_EXT](#VkValidationFeatureDisableEXT)
specifies that there will be no caching of shader validation results and
every shader will be validated on every application execution.
Shader validation caching is enabled by default.

|  | Disabling checks such as parameter validation and object lifetime validation
| --- | --- |
prevents the reporting of error conditions that can cause other validation
checks to behave incorrectly or crash.
Some validation checks assume that their inputs are already valid and do not
always revalidate them. |

|  | The `[VK_EXT_validation_features](../appendices/extensions.html#VK_EXT_validation_features)` extension subsumes all the
| --- | --- |
functionality provided in the `[VK_EXT_validation_flags](../appendices/extensions.html#VK_EXT_validation_flags)` extension. |

To create a Vulkan instance with a specific configuration of layer settings,
add [VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT) structures to the `pNext` chain
of the [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure, specifying the settings to be
configured.

// Provided by VK_EXT_layer_settings
typedef struct VkLayerSettingsCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    uint32_t                    settingCount;
    const VkLayerSettingEXT*    pSettings;
} VkLayerSettingsCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`settingCount` is the number of settings to configure.

* 
`pSettings` is a pointer to an array of `settingCount`
[VkLayerSettingEXT](#VkLayerSettingEXT) values specifying the settings to be configured.

Valid Usage (Implicit)

* 
[](#VUID-VkLayerSettingsCreateInfoEXT-sType-sType) VUID-VkLayerSettingsCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkLayerSettingsCreateInfoEXT-pSettings-parameter) VUID-VkLayerSettingsCreateInfoEXT-pSettings-parameter

 If `settingCount` is not `0`, `pSettings` **must** be a valid pointer to an array of `settingCount` valid [VkLayerSettingEXT](#VkLayerSettingEXT) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](#VkInstanceCreateInfo)

The values of elements of the
[VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT)::`pSettings` array, specifying layer
settings to be configured, are:

// Provided by VK_EXT_layer_settings
typedef struct VkLayerSettingEXT {
    const char*              pLayerName;
    const char*              pSettingName;
    VkLayerSettingTypeEXT    type;
    uint32_t                 valueCount;
    const void*              pValues;
} VkLayerSettingEXT;

* 
`pLayerName` is a pointer to a null-terminated UTF-8 string naming
the layer to configure the setting from.

* 
`pSettingName` is a pointer to a null-terminated UTF-8 string naming
the setting to configure.
Values of `pSettingName` that are unknown to the layer are ignored.

* 
`type` is a [VkLayerSettingTypeEXT](#VkLayerSettingTypeEXT) value specifying the type of
the `pValues` values.

* 
`valueCount` is the number of values used to configure the layer
setting.

* 
`pValues` is a pointer to an array of `valueCount` values of the
type indicated by `type` to configure the layer setting.

When multiple [VkLayerSettingsCreateInfoEXT](#VkLayerSettingsCreateInfoEXT) structures are chained and
the same `pSettingName` is referenced for the same `pLayerName`, the
value of the first reference of the layer setting is used.

Valid Usage

* 
[](#VUID-VkLayerSettingEXT-valueCount-10070) VUID-VkLayerSettingEXT-valueCount-10070

If `valueCount` is not `0`, `pValues` **must** be a valid pointer
to an array of `valueCount` values of the type indicated by
`type`

Valid Usage (Implicit)

* 
[](#VUID-VkLayerSettingEXT-pLayerName-parameter) VUID-VkLayerSettingEXT-pLayerName-parameter

 `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkLayerSettingEXT-pSettingName-parameter) VUID-VkLayerSettingEXT-pSettingName-parameter

 `pSettingName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkLayerSettingEXT-type-parameter) VUID-VkLayerSettingEXT-type-parameter

 `type` **must** be a valid [VkLayerSettingTypeEXT](#VkLayerSettingTypeEXT) value

Possible values of [VkLayerSettingEXT](#VkLayerSettingEXT)::`type`, specifying the type
of the data returned in [VkLayerSettingEXT](#VkLayerSettingEXT)::`pValues`, are:

// Provided by VK_EXT_layer_settings
typedef enum VkLayerSettingTypeEXT {
    VK_LAYER_SETTING_TYPE_BOOL32_EXT = 0,
    VK_LAYER_SETTING_TYPE_INT32_EXT = 1,
    VK_LAYER_SETTING_TYPE_INT64_EXT = 2,
    VK_LAYER_SETTING_TYPE_UINT32_EXT = 3,
    VK_LAYER_SETTING_TYPE_UINT64_EXT = 4,
    VK_LAYER_SETTING_TYPE_FLOAT32_EXT = 5,
    VK_LAYER_SETTING_TYPE_FLOAT64_EXT = 6,
    VK_LAYER_SETTING_TYPE_STRING_EXT = 7,
} VkLayerSettingTypeEXT;

* 
[VK_LAYER_SETTING_TYPE_BOOL32_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is `VkBool32`.

* 
[VK_LAYER_SETTING_TYPE_INT32_EXT](#VkLayerSettingTypeEXT) specifies that the layer setting’s
type is signed 32-bit integer.

* 
[VK_LAYER_SETTING_TYPE_INT64_EXT](#VkLayerSettingTypeEXT) specifies that the layer setting’s
type is signed 64-bit integer.

* 
[VK_LAYER_SETTING_TYPE_UINT32_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is unsigned 32-bit integer.

* 
[VK_LAYER_SETTING_TYPE_UINT64_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is unsigned 64-bit integer.

* 
[VK_LAYER_SETTING_TYPE_FLOAT32_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is 32-bit floating-point.

* 
[VK_LAYER_SETTING_TYPE_FLOAT64_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is 64-bit floating-point.

* 
[VK_LAYER_SETTING_TYPE_STRING_EXT](#VkLayerSettingTypeEXT) specifies that the layer
setting’s type is a pointer to a null-terminated UTF-8 string.

The `VkDirectDriverLoadingListLUNARG` structure is defined as:

// Provided by VK_LUNARG_direct_driver_loading
typedef struct VkDirectDriverLoadingListLUNARG {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDirectDriverLoadingModeLUNARG           mode;
    uint32_t                                  driverCount;
    const VkDirectDriverLoadingInfoLUNARG*    pDrivers;
} VkDirectDriverLoadingListLUNARG;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` controls the mode in which to load the provided drivers.

* 
`driverCount` is the number of driver manifest paths.

* 
`pDrivers` is a pointer to an array of `driverCount`
[VkDirectDriverLoadingInfoLUNARG](#VkDirectDriverLoadingInfoLUNARG) structures.

When creating a Vulkan instance for which additional drivers are to be
included, add a `VkDirectDriverLoadingListLUNARG` structure to the pNext
chain of the [VkInstanceCreateInfo](#VkInstanceCreateInfo) structure, and include in it the
list of `VkDirectDriverLoadingInfoLUNARG` structures which contain the
information necessary to load additional drivers.

Valid Usage (Implicit)

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-sType-sType) VUID-VkDirectDriverLoadingListLUNARG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_LIST_LUNARG](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-mode-parameter) VUID-VkDirectDriverLoadingListLUNARG-mode-parameter

 `mode` **must** be a valid [VkDirectDriverLoadingModeLUNARG](#VkDirectDriverLoadingModeLUNARG) value

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-pDrivers-parameter) VUID-VkDirectDriverLoadingListLUNARG-pDrivers-parameter

 `pDrivers` **must** be a valid pointer to an array of `driverCount` valid [VkDirectDriverLoadingInfoLUNARG](#VkDirectDriverLoadingInfoLUNARG) structures

* 
[](#VUID-VkDirectDriverLoadingListLUNARG-driverCount-arraylength) VUID-VkDirectDriverLoadingListLUNARG-driverCount-arraylength

 `driverCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](#VkInstanceCreateInfo)

The `VkDirectDriverLoadingInfoLUNARG` structure is defined as:

// Provided by VK_LUNARG_direct_driver_loading
typedef struct VkDirectDriverLoadingInfoLUNARG {
    VkStructureType                     sType;
    void*                               pNext;
    VkDirectDriverLoadingFlagsLUNARG    flags;
    PFN_vkGetInstanceProcAddrLUNARG     pfnGetInstanceProcAddr;
} VkDirectDriverLoadingInfoLUNARG;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pfnGetInstanceProcAddr` is a [PFN_vkGetInstanceProcAddrLUNARG](#PFN_vkGetInstanceProcAddrLUNARG)
pointer to the driver [vkGetInstanceProcAddr](#vkGetInstanceProcAddr) function.

Valid Usage (Implicit)

* 
[](#VUID-VkDirectDriverLoadingInfoLUNARG-sType-sType) VUID-VkDirectDriverLoadingInfoLUNARG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_INFO_LUNARG](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDirectDriverLoadingInfoLUNARG-flags-zerobitmask) VUID-VkDirectDriverLoadingInfoLUNARG-flags-zerobitmask

 `flags` **must** be `0`

Possible values of [VkDirectDriverLoadingListLUNARG](#VkDirectDriverLoadingListLUNARG)::`mode`,
specifying the mode in which drivers are used, are:

// Provided by VK_LUNARG_direct_driver_loading
typedef enum VkDirectDriverLoadingModeLUNARG {
    VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG = 0,
    VK_DIRECT_DRIVER_LOADING_MODE_INCLUSIVE_LUNARG = 1,
} VkDirectDriverLoadingModeLUNARG;

* 
[VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG](#VkDirectDriverLoadingModeLUNARG) specifies that the
provided drivers are used instead of the system-loaded drivers.

* 
[VK_DIRECT_DRIVER_LOADING_MODE_INCLUSIVE_LUNARG](#VkDirectDriverLoadingModeLUNARG) specifies that the
provided drivers are used in addition to the system-loaded drivers.

// Provided by VK_LUNARG_direct_driver_loading
typedef VkFlags VkDirectDriverLoadingFlagsLUNARG;

`VkDirectDriverLoadingFlagsLUNARG` is a bitmask type for setting a mask,
but is currently reserved for future use.

The type of [PFN_vkGetInstanceProcAddrLUNARG](#PFN_vkGetInstanceProcAddrLUNARG) is:

// Provided by VK_LUNARG_direct_driver_loading
typedef PFN_vkVoidFunction (*PFN_vkGetInstanceProcAddrLUNARG)(
    VkInstance                                  instance,
    const char*                                 pName);

* 
`instance` is a [VkInstance](#VkInstance) handle.

* 
`pName` is the name of a Vulkan command.

This type is compatible with the type of a pointer to the
[vkGetInstanceProcAddr](#vkGetInstanceProcAddr) command, but is used only to specify device
driver addresses in
[VkDirectDriverLoadingInfoLUNARG](#VkDirectDriverLoadingInfoLUNARG)::`pfnGetInstanceProcAddr`.

|  | This type exists only because of limitations in the XML schema and
| --- | --- |
processing scripts, and its name may change in the future.
Ideally we would use the `PFN_vkGetInstanceProcAddr` type generated in
the `vulkan_core.h` header. |

The `VkApplicationInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkApplicationInfo {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pApplicationName;
    uint32_t           applicationVersion;
    const char*        pEngineName;
    uint32_t           engineVersion;
    uint32_t           apiVersion;
} VkApplicationInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pApplicationName` is `NULL` or is a pointer to a null-terminated
UTF-8 string containing the name of the application.

* 
`applicationVersion` is an unsigned integer variable containing the
developer-supplied version number of the application.

* 
`pEngineName` is `NULL` or is a pointer to a null-terminated UTF-8
string containing the name of the engine (if any) used to create the
application.

* 
`engineVersion` is an unsigned integer variable containing the
developer-supplied version number of the engine used to create the
application.

* 
`apiVersion` **must** be the highest version of Vulkan that the
application is designed to use, encoded as described in
[Version Numbers](extensions.html#extendingvulkan-coreversions-versionnumbers).
The patch version number specified in `apiVersion` is ignored when
creating an instance object.
The variant version of the instance **must** match that requested in
`apiVersion`.

Vulkan 1.0 implementations were required to return
[VK_ERROR_INCOMPATIBLE_DRIVER](fundamentals.html#VkResult) if `apiVersion` was larger than 1.0.
Implementations that support Vulkan 1.1 or later **must** not return
[VK_ERROR_INCOMPATIBLE_DRIVER](fundamentals.html#VkResult) for any value of `apiVersion`
.

|  | Because Vulkan 1.0 implementations **may** fail with
| --- | --- |
[VK_ERROR_INCOMPATIBLE_DRIVER](fundamentals.html#VkResult), applications **should** determine the
version of Vulkan available before calling [vkCreateInstance](#vkCreateInstance).
If the [vkGetInstanceProcAddr](#vkGetInstanceProcAddr) returns `NULL` for
[vkEnumerateInstanceVersion](#vkEnumerateInstanceVersion), it is a Vulkan 1.0 implementation.
Otherwise, the application **can** call [vkEnumerateInstanceVersion](#vkEnumerateInstanceVersion) to
determine the version of Vulkan. |

As long as the instance supports at least Vulkan 1.1, an application **can**
use different versions of Vulkan with an instance than it does with a device
or physical device.

|  | The Khronos validation layers will treat `apiVersion` as the highest API
| --- | --- |
version the application targets, and will validate API usage against the
minimum of that version and the implementation version (instance or device,
depending on context).
If an application tries to use functionality from a greater version than
this, a validation error will be triggered.

For example, if the instance supports Vulkan 1.1 and three physical devices
support Vulkan 1.0, Vulkan 1.1, and Vulkan 1.2, respectively, and if the
application sets `apiVersion` to 1.2, the application **can** use the
following versions of Vulkan:

* 
Vulkan 1.0 **can** be used with the instance and with all physical devices.

* 
Vulkan 1.1 **can** be used with the instance and with the physical devices
that support Vulkan 1.1 and Vulkan 1.2.

* 
Vulkan 1.2 **can** be used with the physical device that supports Vulkan
1.2.

If we modify the above example so that the application sets `apiVersion`
to 1.1, then the application **must** not use Vulkan 1.2 functionality on the
physical device that supports Vulkan 1.2. |

|  | Providing a `NULL` [VkInstanceCreateInfo](#VkInstanceCreateInfo)::`pApplicationInfo` or
| --- | --- |
providing an `apiVersion` of 0 is equivalent to providing an
`apiVersion` of
`VK_MAKE_API_VERSION(0,1,0,0)`. |

Valid Usage

* 
[](#VUID-VkApplicationInfo-apiVersion-04010) VUID-VkApplicationInfo-apiVersion-04010

If `apiVersion` is not `0`, then it **must** be greater than or equal
to [VK_API_VERSION_1_0](extensions.html#VK_API_VERSION_1_0)

Valid Usage (Implicit)

* 
[](#VUID-VkApplicationInfo-sType-sType) VUID-VkApplicationInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_APPLICATION_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkApplicationInfo-pNext-pNext) VUID-VkApplicationInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkApplicationInfo-pApplicationName-parameter) VUID-VkApplicationInfo-pApplicationName-parameter

 If `pApplicationName` is not `NULL`, `pApplicationName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkApplicationInfo-pEngineName-parameter) VUID-VkApplicationInfo-pEngineName-parameter

 If `pEngineName` is not `NULL`, `pEngineName` **must** be a null-terminated UTF-8 string

To destroy an instance, call:

// Provided by VK_VERSION_1_0
void vkDestroyInstance(
    VkInstance                                  instance,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the handle of the instance to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Prior to destroying an instance, an application is responsible for
destroying/freeing any Vulkan objects with explicit `vkDestroy*` or
`vkFree*` commands that were created using that instance, or any
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) object retrieved from it, as the first parameter of
the corresponding `vkCreate*` or `vkAllocate*` command.

Valid Usage

* 
[](#VUID-vkDestroyInstance-instance-00629) VUID-vkDestroyInstance-instance-00629

All child objects that were created with `instance` or with a
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) retrieved from it, and that **can** be destroyed or
freed, **must** have been destroyed or freed prior to destroying
`instance`

* 
[](#VUID-vkDestroyInstance-instance-00630) VUID-vkDestroyInstance-instance-00630

If `VkAllocationCallbacks` were provided when `instance` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyInstance-instance-00631) VUID-vkDestroyInstance-instance-00631

If no `VkAllocationCallbacks` were provided when `instance` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyInstance-instance-parameter) VUID-vkDestroyInstance-instance-parameter

 If `instance` is not `NULL`, `instance` **must** be a valid [VkInstance](#VkInstance) handle

* 
[](#VUID-vkDestroyInstance-pAllocator-parameter) VUID-vkDestroyInstance-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

Host Synchronization

* 
Host access to `instance` **must** be externally synchronized

* 
Host access to all `VkPhysicalDevice` objects enumerated from `instance` **must** be externally synchronized
