# Extending Vulkan

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/extensions.html

## Table of Contents

- [Functionality Levels](#extendingvulkan-functionalitylevels)
- [Instance and Device Versions](#extendingvulkan-instanceanddeviceversions)
- [Instance_and_Device_Versions](#extendingvulkan-instanceanddeviceversions)
- [Core Versions](#extendingvulkan-coreversions)
- [Version Numbers](#extendingvulkan-coreversions-versionnumbers)
- [Layers](#extendingvulkan-layers)
- [Extensions](#extendingvulkan-extensions)
- [Instance Extensions](#extendingvulkan-instance-extensions)
- [Device Extensions](#extendingvulkan-device-extensions)
- [Extension Dependencies](#extendingvulkan-extensions-extensiondependencies)
- [Compatibility Guarantees (Informative)](#_compatibility_guarantees_informative)
- [Compatibility_Guarantees_(Informative)](#_compatibility_guarantees_informative)
- [Core Versions](#extendingvulkan-compatibility-coreversions)
- [Patch Versions](#_patch_versions)
- [Minor Versions](#_minor_versions)
- [Major Versions](#_major_versions)
- [Extensions](#extendingvulkan-compatibility-extensions)
- [Promotion](#extendingvulkan-compatibility-promotion)
- [Deprecation](#extendingvulkan-compatibility-deprecation)
- [Obsoletion](#extendingvulkan-compatibility-obsoletion)
- [Aliases](#extendingvulkan-compatibility-aliases)
- [Special Use Extensions](#extendingvulkan-compatibility-specialuse)
- [Special_Use_Extensions](#extendingvulkan-compatibility-specialuse)

## Content

New functionality **may** be added to Vulkan via either new extensions or new
versions of the core, or new versions of an extension in some cases.

This chapter describes how Vulkan is versioned, how compatibility is
affected between different versions, and compatibility rules that are
followed by the Vulkan Working Group.

Functionality in Vulkan is divided into several different levels; global,
instance-level, physical-device-level, and device-level.

* 
[VkInstance](initialization.html#VkInstance) and any objects created from a [VkInstance](initialization.html#VkInstance) other
than [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) are instance-level.

* 
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) is the only physical-device-level object.

* 
[VkDevice](devsandqueues.html#VkDevice) and any objects created from a [VkDevice](devsandqueues.html#VkDevice) are
device-level.

The level of a command is the same as the level of its first parameter - if
the first parameter is not a [dispatchable handle](fundamentals.html#fundamentals-objectmodel-overview), it is a global command.
Different levels of functionality **may** be advertised in different ways.

Starting with Vulkan 1.1, there are separate versions advertised for the
Vulkan instance, and for each device supported on the system.
This allows a system with multiple devices to advertise all devices at their
full capabilities, even if those devices do not support the same version of
Vulkan.

The instance version indicates which global and instance-level functionality
is supported, while each device version indicates the physical-device-level
and device-level functionality supported.

The instance version **can** be queried by calling
[vkEnumerateInstanceVersion](initialization.html#vkEnumerateInstanceVersion).
Querying for this function via [vkGetInstanceProcAddr](initialization.html#vkGetInstanceProcAddr) will return
`NULL` on implementations that only support Vulkan 1.0 functionality.

The device version **can** be queried by calling
[vkGetPhysicalDeviceProperties](devsandqueues.html#vkGetPhysicalDeviceProperties) or [vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2),
and is returned in [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion`,
encoded as described in [Version Numbers](#extendingvulkan-coreversions-versionnumbers).

The Vulkan Specification is regularly updated with bug fixes and
clarifications.
Occasionally new functionality is added to the core and at some point it is
expected that there will be a desire to perform a large, breaking change to
the API.
In order to indicate to developers how and when these changes are made to
the specification, and to provide a way to identify each set of changes, the
Vulkan API maintains a version number.

The Vulkan version number comprises four parts indicating the variant,
major, minor and patch version of the Vulkan API Specification.

The *variant* indicates the variant of the Vulkan API supported by the
implementation.
This is always 0 for the Vulkan API.

|  | A non-zero variant indicates the API is a variant of the Vulkan API and
| --- | --- |
applications will typically need to be modified to run against it.
The variant field was a later addition to the version number, added in
version 1.2.175 of the
Specification.
As Vulkan uses variant 0, this change is fully backwards compatible with the
previous version number format for Vulkan implementations.
New version number macros have been added for this change and the old macros
marked as legacy.
For existing applications using the older format and macros, an
implementation with non-zero variant will decode as a very high Vulkan
version.
The high version number should be detectable by applications performing
suitable version checking. |

The *major version* indicates a significant change in the API, which will
encompass a wholly new version of the specification.

The *minor version* indicates the incorporation of new functionality into
the core specification.

The *patch version* indicates bug fixes, clarifications, and language
improvements have been incorporated into the specification.

Compatibility guarantees made about versions of the API sharing any of the
same version numbers are documented in
[Core Versions](#extendingvulkan-compatibility-coreversions)

The version number is used in several places in the API.
In each such use, the version numbers are packed into a 32-bit integer as
follows:

* 
The variant is a 3-bit integer packed into bits 31-29.

* 
The major version is a 7-bit integer packed into bits 28-22.

* 
The minor version number is a 10-bit integer packed into bits 21-12.

* 
The patch version number is a 12-bit integer packed into bits 11-0.

`VK_API_VERSION_VARIANT` extracts the API variant number from a packed
version number:

// Provided by VK_VERSION_1_0
#define VK_API_VERSION_VARIANT(version) ((uint32_t)(version) >> 29U)

`VK_API_VERSION_MAJOR` extracts the API major version number from a
packed version number:

// Provided by VK_VERSION_1_0
#define VK_API_VERSION_MAJOR(version) (((uint32_t)(version) >> 22U) & 0x7FU)

`VK_VERSION_MAJOR` extracts the API major version number from a packed
version number:

|  | This functionality is superseded by [Vulkan Version 1.0](../appendices/versions.html#versions-1.0). See [Legacy Functionality](../appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_VERSION_MAJOR(version) ((uint32_t)(version) >> 22U)

`VK_API_VERSION_MINOR` extracts the API minor version number from a
packed version number:

// Provided by VK_VERSION_1_0
#define VK_API_VERSION_MINOR(version) (((uint32_t)(version) >> 12U) & 0x3FFU)

`VK_VERSION_MINOR` extracts the API minor version number from a packed
version number:

|  | This functionality is superseded by [Vulkan Version 1.0](../appendices/versions.html#versions-1.0). See [Legacy Functionality](../appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_VERSION_MINOR(version) (((uint32_t)(version) >> 12U) & 0x3FFU)

`VK_API_VERSION_PATCH` extracts the API patch version number from a
packed version number:

// Provided by VK_VERSION_1_0
#define VK_API_VERSION_PATCH(version) ((uint32_t)(version) & 0xFFFU)

`VK_VERSION_PATCH` extracts the API patch version number from a packed
version number:

|  | This functionality is superseded by [Vulkan Version 1.0](../appendices/versions.html#versions-1.0). See [Legacy Functionality](../appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_VERSION_PATCH(version) ((uint32_t)(version) & 0xFFFU)

`VK_MAKE_API_VERSION` constructs an API version number.

// Provided by VK_VERSION_1_0
#define VK_MAKE_API_VERSION(variant, major, minor, patch) \
    ((((uint32_t)(variant)) 

* 
`variant` is the variant number.

* 
`major` is the major version number.

* 
`minor` is the minor version number.

* 
`patch` is the patch version number.

`VK_MAKE_VERSION` constructs an API version number.

|  | This functionality is superseded by [Vulkan Version 1.0](../appendices/versions.html#versions-1.0). See [Legacy Functionality](../appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_MAKE_VERSION(major, minor, patch) \
    ((((uint32_t)(major)) 

* 
`major` is the major version number.

* 
`minor` is the minor version number.

* 
`patch` is the patch version number.

`VK_API_VERSION_1_0` returns the API version number for Vulkan 1.0.0.

// Provided by VK_VERSION_1_0
// Vulkan 1.0 version number
#define VK_API_VERSION_1_0 VK_MAKE_API_VERSION(0, 1, 0, 0)// Patch version should always be set to 0

`VK_API_VERSION_1_1` returns the API version number for Vulkan 1.1.0.

// Provided by VK_VERSION_1_1
// Vulkan 1.1 version number
#define VK_API_VERSION_1_1 VK_MAKE_API_VERSION(0, 1, 1, 0)// Patch version should always be set to 0

`VK_API_VERSION_1_2` returns the API version number for Vulkan 1.2.0.

// Provided by VK_VERSION_1_2
// Vulkan 1.2 version number
#define VK_API_VERSION_1_2 VK_MAKE_API_VERSION(0, 1, 2, 0)// Patch version should always be set to 0

`VK_API_VERSION_1_3` returns the API version number for Vulkan 1.3.0.

// Provided by VK_VERSION_1_3
// Vulkan 1.3 version number
#define VK_API_VERSION_1_3 VK_MAKE_API_VERSION(0, 1, 3, 0)// Patch version should always be set to 0

`VK_API_VERSION_1_4` returns the API version number for Vulkan 1.4.0.

// Provided by VK_VERSION_1_4
// Vulkan 1.4 version number
#define VK_API_VERSION_1_4 VK_MAKE_API_VERSION(0, 1, 4, 0)// Patch version should always be set to 0

When a layer is enabled, it inserts itself into the call chain for Vulkan
commands the layer is interested in.
Layers **can** be used for a variety of tasks that extend the base behavior of
Vulkan beyond what is required by the specification - such as call logging,
tracing, validation, or providing additional extensions.

|  | For example, an implementation is not expected to check that the value of
| --- | --- |
enums used by the application fall within allowed ranges.
Instead, a validation layer would do those checks and flag issues.
This avoids a performance penalty during production use of the application
because those layers would not be enabled in production. |

|  | Vulkan layers **may** wrap object handles (i.e. return a different handle value
| --- | --- |
to the application than that generated by the implementation).
This is generally discouraged, as it increases the probability of
incompatibilities with new extensions.
The validation layers wrap handles in order to track the proper use and
destruction of each object.
See the [“Architecture of the Vulkan Loader Interfaces”](introduction.html#LoaderInterfaceArchitecture) document for additional information. |

To query the available layers, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateInstanceLayerProperties(
    uint32_t*                                   pPropertyCount,
    VkLayerProperties*                          pProperties);

* 
`pPropertyCount` is a pointer to an integer related to the number of
layer properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkLayerProperties](#VkLayerProperties) structures.

If `pProperties` is `NULL`, then the number of layer properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of layer properties
available, at most `pPropertyCount` structures will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available properties were returned.

The list of available layers may change at any time due to actions outside
of the Vulkan implementation, so two calls to
`vkEnumerateInstanceLayerProperties` with the same parameters **may**
return different results, or retrieve different `pPropertyCount` values
or `pProperties` contents.
Once an instance has been created, the layers enabled for that instance will
continue to be enabled and valid for the lifetime of that instance, even if
some of them become unavailable for future instances.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceLayerProperties-pPropertyCount-parameter) VUID-vkEnumerateInstanceLayerProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateInstanceLayerProperties-pProperties-parameter) VUID-vkEnumerateInstanceLayerProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkLayerProperties](#VkLayerProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkLayerProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkLayerProperties {
    char        layerName[VK_MAX_EXTENSION_NAME_SIZE];
    uint32_t    specVersion;
    uint32_t    implementationVersion;
    char        description[VK_MAX_DESCRIPTION_SIZE];
} VkLayerProperties;

* 
`layerName` is an array of [VK_MAX_EXTENSION_NAME_SIZE](#VK_MAX_EXTENSION_NAME_SIZE)
`char` containing a null-terminated UTF-8 string which is the name of
the layer.
Use this name in the `ppEnabledLayerNames` array passed in the
[VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) structure to enable this layer for an
instance.

* 
`specVersion` is the Vulkan version the layer was written to,
encoded as described in [Version Numbers](#extendingvulkan-coreversions-versionnumbers).

* 
`implementationVersion` is the version of this layer.
It is an integer, increasing with backward compatible changes.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which provides additional
details that **can** be used by the application to identify the layer.

[VK_MAX_EXTENSION_NAME_SIZE](#VK_MAX_EXTENSION_NAME_SIZE) is the length in `char` values of an
array containing a layer or extension name string, as returned in
[VkLayerProperties](#VkLayerProperties)::`layerName`,
[VkExtensionProperties](#VkExtensionProperties)::`extensionName`, and other queries.

#define VK_MAX_EXTENSION_NAME_SIZE        256U

[VK_MAX_DESCRIPTION_SIZE](#VK_MAX_DESCRIPTION_SIZE) is the length in `char` values of an array
containing a string with additional descriptive information about a query,
as returned in [VkLayerProperties](#VkLayerProperties)::`description` and other queries.

#define VK_MAX_DESCRIPTION_SIZE           256U

To enable a layer, the name of the layer **should** be added to the
`ppEnabledLayerNames` member of [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) when creating
a `VkInstance`.

Loader implementations **may** provide mechanisms outside the Vulkan API for
enabling specific layers.
Layers enabled through such a mechanism are *implicitly enabled*, while
layers enabled by including the layer name in the `ppEnabledLayerNames`
member of [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) are *explicitly enabled*.
Implicitly enabled layers are loaded before explicitly enabled layers, such
that implicitly enabled layers are closer to the application, and explicitly
enabled layers are closer to the driver.
Except where otherwise specified, implicitly enabled and explicitly enabled
layers differ only in the way they are enabled, and the order in which they
are loaded.
Explicitly enabling a layer that is implicitly enabled results in this layer
being loaded as an implicitly enabled layer; it has no additional effect.

To enumerate device layers, call:

|  | This functionality is superseded by [Vulkan Version 1.0](../appendices/versions.html#versions-1.0). See [Legacy Functionality](../appendices/legacy.html#legacy-devicelayers) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkEnumerateDeviceLayerProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkLayerProperties*                          pProperties);

* 
`physicalDevice` is the physical device that will be queried.

* 
`pPropertyCount` is a pointer to an integer related to the number of
layer properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkLayerProperties](#VkLayerProperties) structures.

If `pProperties` is `NULL`, then the number of layer properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of layer properties
available, at most `pPropertyCount` structures will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available properties were returned.

The list of layers enumerated by `vkEnumerateDeviceLayerProperties`
**must** be exactly the sequence of layers enabled for the instance.
The members of `VkLayerProperties` for each enumerated layer **must** be
the same as the properties when the layer was enumerated by
`vkEnumerateInstanceLayerProperties`.

|  | Due to platform details on Android, `vkEnumerateDeviceLayerProperties`
| --- | --- |
may be called with `physicalDevice` equal to `NULL` during layer
discovery.
This behavior will only be observed by layer implementations, and not the
underlying Vulkan driver. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateDeviceLayerProperties-physicalDevice-parameter) VUID-vkEnumerateDeviceLayerProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkEnumerateDeviceLayerProperties-pPropertyCount-parameter) VUID-vkEnumerateDeviceLayerProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateDeviceLayerProperties-pProperties-parameter) VUID-vkEnumerateDeviceLayerProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkLayerProperties](#VkLayerProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `ppEnabledLayerNames` and `enabledLayerCount` members of
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) are legacy and their values **must** be ignored by
implementations.
However, for compatibility, only an empty list of layers or a list that
exactly matches the sequence enabled at instance creation time are valid,
and validation layers **should** issue diagnostics for other cases.

Regardless of the enabled layer list provided in [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo),
the
sequence of layers active for a device will be exactly the sequence of
layers enabled when the parent instance was created.

Extensions **may** define new Vulkan commands, structures, and enumerants.
For compilation purposes, the interfaces defined by registered extensions,
including new structures and enumerants as well as function pointer types
for new commands, are defined in the Khronos-supplied `vulkan_core.h`
together with the core API.
However, commands defined by extensions **may** not be available for static
linking - in which case function pointers to these commands **should** be
queried at runtime as described in [Command Function Pointers](initialization.html#initialization-functionpointers).
Extensions **may** be provided by layers as well as by a Vulkan implementation.

Because extensions **may** extend or change the behavior of the Vulkan API,
extension authors **should** add support for their extensions to the Khronos
validation layers.
This is especially important for new commands whose parameters have been
wrapped by the validation layers.
See the [“Architecture of the Vulkan Loader Interfaces”](introduction.html#LoaderInterfaceArchitecture) document for additional information.

|  | To enable an instance extension, the name of the extension **can** be added to
| --- | --- |
the `ppEnabledExtensionNames` member of [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) when
creating a `VkInstance`.

To enable a device extension, the name of the extension **can** be added to the
`ppEnabledExtensionNames` member of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when
creating a `VkDevice`.

Physical-Device-Level functionality does not have any enabling mechanism and
**can** be used as long as the [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) supports the device
extension as determined by [vkEnumerateDeviceExtensionProperties](#vkEnumerateDeviceExtensionProperties).

Enabling an extension (with no further use of that extension) does not
change the behavior of functionality exposed by the core Vulkan API or any
other extension, other than making valid the use of the commands, enums and
structures defined by that extension.

Valid Usage sections for individual commands and structures do not currently
contain which extensions have to be enabled in order to make their use
valid, although they might do so in the future.
It is defined only in the [Valid Usage for Extensions](fundamentals.html#fundamentals-validusage-extensions) section. |

Instance extensions add new [global or instance-level functionality](#extendingvulkan-functionalitylevels) to the API, outside of the core
specification.
Instance extensions **may** also add [physical-device-level functionality](#extendingvulkan-functionalitylevels).

To query the available instance extensions, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateInstanceExtensionProperties(
    const char*                                 pLayerName,
    uint32_t*                                   pPropertyCount,
    VkExtensionProperties*                      pProperties);

* 
`pLayerName` is either `NULL` or a pointer to a null-terminated
UTF-8 string naming the layer to retrieve extensions from.

* 
`pPropertyCount` is a pointer to an integer related to the number of
extension properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkExtensionProperties](#VkExtensionProperties) structures.

When `pLayerName` parameter is `NULL`, only extensions provided by the
Vulkan implementation or by implicitly enabled layers are returned.
When `pLayerName` is the name of a layer, the instance extensions
provided by that layer are returned.

If `pProperties` is `NULL`, then the number of extensions properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of extension properties
available, at most `pPropertyCount` structures will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available properties were returned.

Because the list of available layers may change externally between calls to
[vkEnumerateInstanceExtensionProperties](#vkEnumerateInstanceExtensionProperties), two calls may retrieve
different results if a `pLayerName` is available in one call but not in
another.
The extensions supported by a layer may also change between two calls, e.g.
if the layer implementation is replaced by a different version between those
calls.

Implementations **must** not advertise any pair of extensions that cannot be
enabled together due to behavioral differences, or any extension that cannot
be enabled against the advertised version.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pLayerName-parameter) VUID-vkEnumerateInstanceExtensionProperties-pLayerName-parameter

 If `pLayerName` is not `NULL`, `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pPropertyCount-parameter) VUID-vkEnumerateInstanceExtensionProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateInstanceExtensionProperties-pProperties-parameter) VUID-vkEnumerateInstanceExtensionProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkExtensionProperties](#VkExtensionProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

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

Device extensions add new [device-level functionality](#extendingvulkan-functionalitylevels) to the API, outside of the core specification.
If
Vulkan 1.1
or
[VK_KHR_get_physical_device_properties2](../appendices/extensions.html#VK_KHR_get_physical_device_properties2)
is required by the extension, it **may** also add new
[physical-device-level functionality](#extendingvulkan-functionalitylevels).

To query the extensions available to a given physical device, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumerateDeviceExtensionProperties(
    VkPhysicalDevice                            physicalDevice,
    const char*                                 pLayerName,
    uint32_t*                                   pPropertyCount,
    VkExtensionProperties*                      pProperties);

* 
`physicalDevice` is the physical device that will be queried.

* 
`pLayerName` is either `NULL` or a pointer to a null-terminated
UTF-8 string naming the layer to retrieve extensions from.

* 
`pPropertyCount` is a pointer to an integer related to the number of
extension properties available or queried, and is treated in the same
fashion as the
[vkEnumerateInstanceExtensionProperties](#vkEnumerateInstanceExtensionProperties)::`pPropertyCount`
parameter.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkExtensionProperties](#VkExtensionProperties) structures.

When `pLayerName` parameter is `NULL`, only extensions provided by the
Vulkan implementation or by implicitly enabled layers are returned.
When `pLayerName` is the name of a layer, the device extensions provided
by that layer are returned.

Implementations **must** not advertise any pair of extensions that cannot be
enabled together due to behavioral differences, or any extension that cannot
be enabled against the advertised version.

If the `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` extension is advertised as
supported by this query, the `[VK_KHR_pipeline_library](../appendices/extensions.html#VK_KHR_pipeline_library)` extension
**must** also be supported.

If the `[VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap)` extension is advertised as supported
by this query, the `[VK_KHR_shader_untyped_pointers](../appendices/extensions.html#VK_KHR_shader_untyped_pointers)` extension **must**
also be supported.

Implementations claiming support for the [Roadmap 2022](../appendices/roadmap.html#roadmap-2022)
profile **must** advertise the `[VK_KHR_global_priority](../appendices/extensions.html#VK_KHR_global_priority)` extension in
`pProperties`.

Implementations claiming support for the [Roadmap 2024](../appendices/roadmap.html#roadmap-2024)
profile **must** advertise the following extensions in `pProperties`:

* 
[VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read)

* 
[VK_KHR_load_store_op_none](../appendices/extensions.html#VK_KHR_load_store_op_none)

* 
[VK_KHR_shader_quad_control](../appendices/extensions.html#VK_KHR_shader_quad_control)

* 
[VK_KHR_shader_maximal_reconvergence](../appendices/extensions.html#VK_KHR_shader_maximal_reconvergence)

* 
[VK_KHR_shader_subgroup_uniform_control_flow](../appendices/extensions.html#VK_KHR_shader_subgroup_uniform_control_flow)

* 
[VK_KHR_shader_subgroup_rotate](../appendices/extensions.html#VK_KHR_shader_subgroup_rotate)

* 
[VK_KHR_shader_float_controls2](../appendices/extensions.html#VK_KHR_shader_float_controls2)

* 
[VK_KHR_shader_expect_assume](../appendices/extensions.html#VK_KHR_shader_expect_assume)

* 
[VK_KHR_line_rasterization](../appendices/extensions.html#VK_KHR_line_rasterization)

* 
[VK_KHR_vertex_attribute_divisor](../appendices/extensions.html#VK_KHR_vertex_attribute_divisor)

* 
[VK_KHR_index_type_uint8](../appendices/extensions.html#VK_KHR_index_type_uint8)

* 
[VK_KHR_map_memory2](../appendices/extensions.html#VK_KHR_map_memory2)

* 
[VK_KHR_maintenance5](../appendices/extensions.html#VK_KHR_maintenance5)

* 
[VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor)

|  | Due to platform details on Android,
| --- | --- |
`vkEnumerateDeviceExtensionProperties` may be called with
`physicalDevice` equal to `NULL` during layer discovery.
This behavior will only be observed by layer implementations, and not the
underlying Vulkan driver. |

Valid Usage (Implicit)

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-physicalDevice-parameter) VUID-vkEnumerateDeviceExtensionProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pLayerName-parameter) VUID-vkEnumerateDeviceExtensionProperties-pLayerName-parameter

 If `pLayerName` is not `NULL`, `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pPropertyCount-parameter) VUID-vkEnumerateDeviceExtensionProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumerateDeviceExtensionProperties-pProperties-parameter) VUID-vkEnumerateDeviceExtensionProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkExtensionProperties](#VkExtensionProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

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

The `VkExtensionProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkExtensionProperties {
    char        extensionName[VK_MAX_EXTENSION_NAME_SIZE];
    uint32_t    specVersion;
} VkExtensionProperties;

* 
`extensionName` is an array of [VK_MAX_EXTENSION_NAME_SIZE](#VK_MAX_EXTENSION_NAME_SIZE)
`char` containing a null-terminated UTF-8 string which is the name of
the extension.

* 
`specVersion` is the version of this extension.
It is an integer, incremented with backward compatible changes.

Some extensions are dependent on other extensions, or on specific core API
versions, to function.
To enable extensions with dependencies, any *required extensions* **must** also
be enabled through the same API mechanisms when creating an instance with
[vkCreateInstance](initialization.html#vkCreateInstance) or a device with [vkCreateDevice](devsandqueues.html#vkCreateDevice).
Each extension which has such dependencies documents them in the
[appendix summarizing that extension](../appendices/extensions.html#extensions).

If an extension is supported (as queried by
[vkEnumerateInstanceExtensionProperties](#vkEnumerateInstanceExtensionProperties) or
[vkEnumerateDeviceExtensionProperties](#vkEnumerateDeviceExtensionProperties)), then *required extensions* of
that extension **must** also be supported for the same instance or physical
device.

Any device extension that has an instance extension dependency that is not
enabled by [vkCreateInstance](initialization.html#vkCreateInstance) is considered to be unsupported, hence it
**must** not be returned by [vkEnumerateDeviceExtensionProperties](#vkEnumerateDeviceExtensionProperties) for any
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) child of the instance.
Instance extensions do not have dependencies on device extensions.

If a required extension has been [promoted](#extendingvulkan-compatibility-promotion) to another extension or to a core API version, then as a
*general* rule, the dependency is also satisfied by the promoted extension
or core version.
This will be true so long as any features required by the original extension
are also required or enabled by the promoted extension or core version.
However, in some cases an extension is promoted while making some of its
features optional in the promoted extension or core version.
In this case, the dependency **may** not be satisfied.
The only way to be certain is to look at the descriptions of the original
dependency and the promoted version in the [Layers & Extensions](../appendices/extensions.html#extensions) and [Core Revisions](../appendices/versions.html#versions) appendices.

|  | There is metadata in `vk.xml` describing some aspects of promotion,
| --- | --- |
especially `requires`, `promotedto` and `deprecatedby` attributes of
`` tags.
However, the metadata does not yet fully describe this scenario.
In the future, we may extend the XML schema to describe the full set of
extensions and versions satisfying a dependency.
As discussed in more detail for [Promotion](#extendingvulkan-compatibility-promotion) below, when an extension is promoted it does not mean that a
mechanical substitution of an extension API by the corresponding promoted
API will work in exactly the same fashion; be supported at runtime; or even
exist. |

This section is marked as informal as there is no binding responsibility on
implementations of the Vulkan API - these guarantees are however a contract
between the Vulkan Working Group and developers using this Specification.

Each of the [major, minor, and patch versions](#extendingvulkan-coreversions) of the Vulkan specification provide different compatibility
guarantees.

A difference in the patch version indicates that a set of bug fixes or
clarifications have been made to the Specification.
Informative enums returned by Vulkan commands that will not affect the
runtime behavior of a valid application may be added in a patch version
(e.g. [VkVendorId](devsandqueues.html#VkVendorId)).

The specification’s patch version is strictly increasing for a given major
version of the specification; any change to a specification as described
above will result in the patch version being increased by 1.
Patch versions are applied to all minor versions, even if a given minor
version is not affected by the provoking change.

Specifications with different patch versions but the same major and minor
version are *fully compatible* with each other - such that a valid
application written against one will work with an implementation of another.

|  | If a patch version includes a bug fix or clarification that could have a
| --- | --- |
significant impact on developer expectations, these will be highlighted in
the change log.
Generally the Vulkan Working Group tries to avoid these kinds of changes,
instead fixing them in either an extension or core version. |

Changes in the minor version of the specification indicate that new
functionality has been added to the core specification.
This will usually include new interfaces in the header, and **may** also
include behavior changes and bug fixes.
Core functionality **may** be marked as legacy in a minor version, but will not
be obsoleted or removed.

The specification’s minor version is strictly increasing for a given major
version of the specification; any change to a specification as described
above will result in the minor version being increased by 1.
Changes that can be accommodated in a patch version will not increase the
minor version.

Specifications with a lower minor version are *backwards compatible* with an
implementation of a specification with a higher minor version for core
functionality and extensions issued with the KHR vendor tag.
Vendor and multi-vendor extensions are not guaranteed to remain functional
across minor versions, though in general they are with few exceptions - see
[Obsoletion](#extendingvulkan-compatibility-obsoletion) for more information.

A difference in the major version of specifications indicates a large set of
changes which will likely include interface changes, behavioral changes,
removal of [legacy functionality](../appendices/legacy.html#legacy), and the modification, addition,
or replacement of other functionality.

The specification’s major version is monotonically increasing; any change to
the specification as described above will result in the major version being
increased.
Changes that can be accommodated in a patch or minor version will not
increase the major version.

The Vulkan Working Group intends to only issue a new major version of the
Specification in order to realize significant improvements to the Vulkan API
that will necessarily require breaking compatibility.

A new major version will likely include a wholly new version of the
specification to be issued - which could include an overhaul of the
versioning semantics for the minor and patch versions.
The patch and minor versions of a specification are therefore not meaningful
across major versions.
If a major version of the specification includes similar versioning
semantics, it is expected that the patch and the minor version will be reset
to 0 for that major version.

A KHR extension **must** be able to be enabled alongside any other KHR
extension, and for any minor or patch version of the core Specification
beyond the minimum version it requires.
A multi-vendor extension **should** be able to be enabled alongside any KHR
extension or other multi-vendor extension, and for any minor or patch
version of the core Specification beyond the minimum version it requires.
A vendor extension **should** be able to be enabled alongside any KHR
extension, multi-vendor extension, or other vendor extension from the same
vendor, and for any minor or patch version of the core Specification beyond
the minimum version it requires.
A vendor extension **may** be able to be enabled alongside vendor extensions
from another vendor.

The one other exception to this is if a vendor or multi-vendor extension is
[made obsolete](#extendingvulkan-compatibility-obsoletion) by either a core
version or another extension, which will be highlighted in the
[extension appendix](../appendices/extensions.html#extensions).

Extensions, or features of an extension, **may** be promoted to a new
[core version of the API](../appendices/versions.html#versions), or a newer extension which an equal or
greater number of implementors are in favor of.

|  | Structure and enumerated types defined in extensions that were promoted to
| --- | --- |
core in a later version of Vulkan are defined in terms of the equivalent
Vulkan core interfaces in that version and its successors.
This affects the Vulkan Specification, the Vulkan header files, and the
corresponding XML Registry. |

When extension functionality is promoted, minor changes **may** be introduced,
limited to the following:

* 
Naming

* 
Non-intrusive parameter changes

* 
[Feature advertisement/enablement](features.html#features)

* 
Combining structure parameters into larger structures

* 
Author ID suffixes changed or removed

|  | If extension functionality is promoted, there is no guarantee of direct
| --- | --- |
compatibility, however it should require little effort to port code from the
original feature to the promoted one.

The Vulkan Working Group endeavors to ensure that larger changes are marked
as either [deprecated](#extendingvulkan-compatibility-deprecation) or
[obsoleted](#extendingvulkan-compatibility-obsoletion) as appropriate, and
can do so retroactively if necessary. |

Extensions that are promoted are listed as being promoted in their extension
appendices, with reference to where they were promoted to.

When an extension is promoted, any backwards compatibility aliases which
exist in the extension will **not** be promoted.

|  | As a hypothetical example, if the `[VK_KHR_surface](../appendices/extensions.html#VK_KHR_surface)` extension were
| --- | --- |
promoted to part of a future core version, the
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](VK_KHR_surface/wsi.html#VkColorSpaceKHR) token defined by that extension
would be promoted to `VK_COLOR_SPACE_SRGB_NONLINEAR`.
However, the `VK_COLORSPACE_SRGB_NONLINEAR_KHR` token aliases
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](VK_KHR_surface/wsi.html#VkColorSpaceKHR).
The `VK_COLORSPACE_SRGB_NONLINEAR_KHR` would not be promoted, because it
is a backwards compatibility alias that exists only due to a naming mistake
when the extension was initially published. |

Extensions **may** be marked as [deprecated](../appendices/legacy.html#legacy) when they are no longer
intended to be used by applications under certain conditions.
Generally, a new feature will become available to solve the use case in
another extension or core version of the API, but it is not guaranteed.

|  | Features that are intended to replace deprecated functionality have no
| --- | --- |
guarantees of compatibility, and applications may require drastic
modification in order to make use of the new features. |

Extensions that are deprecated are listed as being deprecated in their
extension appendices, with an explanation of the deprecation and any related
features that are relevant.

Occasionally, an extension will be marked as obsolete if a new version of
the core API or a new extension is fundamentally incompatible with it.
An obsoleted extension **must** not be used with the extension or core version
that obsoleted it.

Extensions that are obsoleted are listed as being obsoleted in their
extension appendices, with reference to what they were obsoleted by.

When an extension is promoted or deprecated by a newer feature, some or all
of its functionality **may** be replicated into the newer feature.
Rather than duplication of all the documentation and definitions, the
specification instead identifies the identical commands and types as
*aliases* of one another.
Each alias is mentioned together with the definition it aliases, with the
older aliases marked as “equivalents”.
Each alias of the same command has identical behavior, and each alias of the
same type has identical meaning - they can be used interchangeably in an
application with no compatibility issues.

|  | For promoted types, the aliased extension type is semantically identical to
| --- | --- |
the new core type.
The C99 headers simply `typedef` the older aliases to the promoted types.

For promoted command aliases, however, there are two separate command
definitions, due to the fact that the C99 ABI has no way to alias command
definitions without resorting to macros.
Calling either command will produce identical behavior within the bounds of
the specification, and should still invoke the same path in the
implementation.
Debug tools may use separate commands with different debug behavior; to
write the appropriate command name to an output log, for instance. |

Some extensions exist only to support a specific purpose or specific class
of application.
These are referred to as “special use extensions”.
Use of these extensions in applications not meeting the special use criteria
is not recommended.

Special use cases are restricted, and only those defined below are used to
describe extensions:

| Special Use | XML Tag | Full Description |
| --- | --- | --- |
| CAD support | cadsupport | Extension is intended to support specialized functionality used by
      CAD/CAM applications. |
| D3D support | d3demulation | Extension is intended to support D3D emulation layers, and
      applications ported from D3D, by adding functionality specific to D3D. |
| Developer tools | devtools | Extension is intended to support developer tools such as
      capture-replay libraries. |
| Debugging tools | debugging | Extension is intended for use by applications when debugging. |
| OpenGL / ES support | glemulation | Extension is intended to support OpenGL and/or OpenGL ES emulation
      layers, and applications ported from those APIs, by adding
      functionality specific to those APIs. |

Special use extensions are identified in the metadata for each such
extension in the [Layers & Extensions](../appendices/extensions.html#extensions) appendix, using the
name in the “Special Use” column above.

Special use extensions are also identified in `vk.xml` with the short name
in “XML Tag” column above, as described in the “API Extensions
(`extension` tag)” section of the [registry schema documentation](introduction.html#vulkan-registry).
