# VK_LUNARG_direct_driver_loading

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_LUNARG_direct_driver_loading.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Current Solution Space](#_current_solution_space)
- [2._Current_Solution_Space](#_current_solution_space)
- [3. Proposal](#_proposal)
- [4. Example Usage](#_example_usage)
- [4._Example_Usage](#_example_usage)
- [5. Issues](#_issues)
- [5.1. Global functions are not extensible](#_global_functions_are_not_extensible)
- [5.1._Global_functions_are_not_extensible](#_global_functions_are_not_extensible)
- [5.2. Should this extension also handle layer loading?](#_should_this_extension_also_handle_layer_loading)
- [5.2._Should_this_extension_also_handle_layer_loading?](#_should_this_extension_also_handle_layer_loading)
- [5.3. Do drivers implement this extension?](#_do_drivers_implement_this_extension)
- [5.3._Do_drivers_implement_this_extension?](#_do_drivers_implement_this_extension)
- [5.4. Are there any changes drivers need to make to allow being used in this extension?](#_are_there_any_changes_drivers_need_to_make_to_allow_being_used_in_this_extension)
- [5.4._Are_there_any_changes_drivers_need_to_make_to_allow_being_used_in_this_extension?](#_are_there_any_changes_drivers_need_to_make_to_allow_being_used_in_this_extension)
- [5.5. What kinds of drivers are expected to be used with this extension?](#_what_kinds_of_drivers_are_expected_to_be_used_with_this_extension)
- [5.5._What_kinds_of_drivers_are_expected_to_be_used_with_this_extension?](#_what_kinds_of_drivers_are_expected_to_be_used_with_this_extension)

## Content

Adds an extension that allows applications to provide drivers to the loader during
instance creation.

There are several uses cases that cause applications to want to ship a driver with
themselves. Adding a fallback CPU driver is necessary in many web browsers to
support hardware which does not support vulkan, as well as for testing
infrastructure where hardware might not be available. While there are currently
several desktop Vulkan Loader mechanisms that allow applications to provide
drivers, they all suffer from various shortcomings. A non comprehensive list is
detailed below.

* 
Some require an installer to be run. This necessitates an uninstaller, as well
as makes the driver 'global' to the system or user.

* 
They may require elevated privileges to use, such as with an installer, or
causes the solution to fail when running with elevated privileges, as with
Environment Variables.

* 
Installation to OS specific locations

Explicit installer and uninstaller needs to be run

* 
Global to all applications

* 
Requires elevated privileges in most cases

* 
Environment Variables

Disabled when running with elevated privileges due to the security concerns

* 
Tedious to setup since they require the full path to the driver manifest

* 
MacOS Bundles -  Allows placing the .dylib inside a relocatable package, loader knows how to look in them

Not available for any other platform

* 
Looking in current working directory

Disabled when running with elevated privileges, as that is an attack vector

`VK_LUNARG_direct_driver_loading` extends the pNext chain of
[VkInstanceCreateInfo](https://docs.vulkan.org/spec/latest/chapters/initialization.html#VkInstanceCreateInfo) to provide a list
of structures which contain the information needed by the loader to load the drivers.
This is achieved by providing the driver’s [vkGetInstanceProcAddr](https://docs.vulkan.org/spec/latest/chapters/initialization.html#vkGetInstanceProcAddr),
bypassing the loaders need to use the systems dynamic linker to load the drivers functions.

The extension also allows applications to use provided drivers exclusively, so that no
drivers found on the system are loaded.

This satisfies the requirements:

* 
Isolated from all other running processes.

* 
No installation required.

* 
Works when the application is running with elevated privileges.

The intent of the extension is to be implemented in the desktop Vulkan-Loader.

typedef struct VkDirectDriverLoadingInfoLUNARG {
    VkStructureType                         sType;
    const void*                             pNext;
    VkDirectDriverLoadingFlagsLUNARG        flags;
    PFN_vkGetInstanceProcAddr               pfnGetInstanceProcAddr;
} VkDirectDriverLoadingInfoLUNARG;

typedef struct VkDirectDriverLoadingListLUNARG {
    VkStructureType                         sType;
    const void*                             pNext;
    VkDirectDriverLoadingModeLUNARG         mode;
    uint32_t                                driverCount;
    const VkDirectDriverLoadingInfoLUNARG*  pDrivers;
} VkDirectDriverLoadingListLUNARG;

typedef enum VkDirectDriverLoadingModeLUNARG {
    VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG = 0,
    VK_DIRECT_DRIVER_LOADING_MODE_INCLUSIVE_LUNARG = 1,
    VK_DIRECT_DRIVER_LOADING_MODE_MAX_ENUM_LUNARG = 0x7FFFFFFF
} VkDirectDriverLoadingModeLUNARG;

`VkDirectDriverLoadingModeLUNARG` allows applications to choose whether to load
only the drivers they provide or include the drivers they provide with all of
the drivers the Vulkan Loader finds on the system.

There is a known defect with this extension. When the application queries the
list of instance extensions, there is no way to provide to the Vulkan Loader the
list of application provided drivers, to combine the driver’s extensions with
the extensions supported by the drivers and implicit layers on the system. As a
workaround, applications can instead load the vkEnumerateInstanceExtensionProperties
entry point from the provided drivers instead to get their list of extensions.

This workaround has a known defect when all of the following is true:

An application uses VK_LUNARG_direct_driver_loading to add drivers.

A layer (that will be enabled) filters out unsupported extensions during
calls to vkEnumerateInstanceExtensionProperties entry point.

The application enables instance extensions in VkInstanceCreateInfo
which are supported by the application provided driver but not the layer(s).

As the application directly calls the driver’s vkEnumerateInstanceExtensionProperties
instead of the loader’s, this prevents layers from being able to modify the list of
extensions. Since the layer will not be able to filter out unsupported instance
extensions, the layer may fail to work, cause bugs elsewhere, or crash.

This example shows typical usage where the provided driver should be the ONLY driver found.
It uses `VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG` to prevent the loader from loading
any drivers on the system, useful for use when running under testing conditions.

VkDirectDriverLoadingInfoLUNARG app_provided_driver{};
app_provided_driver.sType = VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_INFO_LUNARG;
app_provided_driver.pfnGetInstanceProcAddr = /* address of drivers function pointer*/

VkDirectDriverLoadingListLUNARG direct_driver_loading{};
direct_driver_loading.sType = VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_LIST_LUNARG;
direct_driver_loading.mode = VK_DIRECT_DRIVER_LOADING_MODE_EXCLUSIVE_LUNARG; // Do not load any other drivers
direct_driver_loading.driverCount = 1;
direct_driver_loading.pDrivers = &app_provided_driver;

VkInstanceCreateInfo instance_info{};
instance_info.pNext = &direct_driver_loading;

vkCreateInstance(&instance_info, NULL, inst);

Since this proposal allows adding drivers, and vkEnumerateInstanceExtensionProperties
returns the list of extensions supported by drivers on the system, the application
must either 'know' which extensions the provided drivers support or query them
directly then manually enable the extensions in VkInstanceCreateInfo.
While it is an adequate solution for most use cases, it does create a corner case
when layers that modify the instance extension list are present. Fundamentally
it is a problem with the design of extension enumeration and instance creation.
While it is possible to add functionality to this extension which resolves the
issue, it is better solved with its own extension since there are more issues
with instance creation that need addressing than what this extension accomplishes.

No, layers require significantly more information to be present for the loader
to handle correctly, and have the same defect of global functions not being extensible.

No, this would be implemented by the Vulkan Loader.

Partially, drivers do not need modification to work today. However, to support
all of the features of the Loader-ICD interface, they will need to support the
"Loader-ICD interface version 7". This version requires that all currently
exported entry points in the Loader-ICD interface be queryable through
vkGetInstanceProcAddr, which is simple addition.

This extension is designed to be used with non-hardware drivers, such as software
implementations like lavapipe and swiftshader, as well as API translation layers
like MoltenVK. Trying to use this extension with hardware drivers is expressedly
not intended and actively discouraged as hardware drivers require support by the
Operating System and other system components that must be installed. Additionally
the kernel components of hardware drivers are liable to change between versions
rendering any user mode components useless after updates.
