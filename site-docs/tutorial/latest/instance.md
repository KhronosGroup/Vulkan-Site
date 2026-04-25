# Instance

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/03_Drawing_a_triangle/00_Setup/01_Instance.html

## Table of Contents

- [Creating an instance](#_creating_an_instance)
- [Creating_an_instance](#_creating_an_instance)
- [Encountered vk::Result::eErrorIncompatibleDriver:](#_encountered_vkresulteerrorincompatibledriver)
- [Checking for extension support](#_checking_for_extension_support)
- [Checking_for_extension_support](#_checking_for_extension_support)

## Content

The very first thing you need to do is initialize the Vulkan library by creating
an **instance**. The instance is the connection between your application and the
Vulkan library, and creating it involves specifying some details about your
application to the driver.

Start by adding a `createInstance` function and invoking it in the
`initVulkan` function.

void initVulkan() {
    createInstance();
}

Additionally, add a data member to hold the handle to the instance and the
raii context:

private:
vk::raii::Context  context;
vk::raii::Instance instance = nullptr;

Now, to create an instance, we’ll first have to fill in a struct with some
information about our application. This data is technically optional, but it may
provide some useful information to the driver to optimize our specific
 application, (e.g., because it uses a well-known graphics engine with
certain special behavior). This struct is called `vk::ApplicationInfo`:

void createInstance()
{
    constexpr vk::ApplicationInfo appInfo{.pApplicationName   = "Hello Triangle",
                                          .applicationVersion = VK_MAKE_VERSION( 1, 0, 0 ),
                                          .pEngineName        = "No Engine",
                                          .engineVersion      = VK_MAKE_VERSION( 1, 0, 0 ),
                                          .apiVersion         = vk::ApiVersion14};
}

While vk::ApiVersion10 or Vulkan 1.0 does exist, some functionality
is older and doesn’t work well with RAII, or as we’ll [talk about later](../02_Graphics_pipeline_basics/01_Shader_modules.html),
 the Slang language, so we’re showing 1.4 as our baseline. If we were in the C
api, we’d need to specify the stype and the pnext and be overly verbose.
You will likely see that in other Vulkan projects that use C api. This is
handled for you by using the modern c++ module.

A lot of information in Vulkan is passed through structs instead of function
parameters, and we’ll have to fill in one more struct to provide sufficient
information for creating an instance. This next struct is not optional and tells
the Vulkan driver which global extensions and validation layers we want to use.
Global here means that they apply to the entire program and not a specific
device, which will become clear in the next few chapters.

vk::InstanceCreateInfo createInfo{
    .pApplicationInfo = &appInfo
};

This structure has a member named flags, which we will handle later in this chapter.
The member pApplicationInfo points to the appInfo that we just created.
The next is an array of layers being requested, and the final is an array of
the desired global extensions. As mentioned in the overview chapter, Vulkan
is a platform-agnostic API, which means that you need an extension to interface
with the window system. GLFW has a handy built-in function that returns the
extension(s) it needs to do that which we can pass to the struct:

// Get the required instance extensions from GLFW.
uint32_t glfwExtensionCount = 0;
auto glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

// Check if the required GLFW extensions are supported by the Vulkan implementation.
auto extensionProperties = context.enumerateInstanceExtensionProperties();
for (uint32_t i = 0; i 

The other missing piece is the Layers to enable. Here is where we’ll talk
about how to enable validation layers, which is one of the most useful and
important layers to enable for any project. We’ll talk about this more
in-depth in the next chapter, so leave this empty for now.

We’ve now specified everything Vulkan needs to create an instance, and we can
finally create the vk::raii::Instance:

instance = vk::raii::Instance(context, createInfo);

As you’ll see, the general pattern that object creation function parameters in
Vulkan follow is:

* 
Pointer to struct with creation info

* 
Pointer to custom allocator callbacks, always ignored in this tutorial as
it is optional if you’re using the default.

* 
Pointer to the device, instance, or context on which the constructor depends

* 
Returns the pointer to the raii constructed object.

If everything went well, then the handle to the instance was returned. We can
check that everything worked by use of c++ exceptions. If you can’t use c++
exceptions, you can turn them off by defining VULKAN_HPP_NO_EXCEPTIONS.  Then
the calls will return a std::tuple with a VKResult and the returned object.
Here’s an example of checking for errors in Vulkan calls:

    try
    {
        vk::raii::Context context;
        vk::raii::Instance instance(context, vk::InstanceCreateInfo{});
        vk::raii::PhysicalDevice physicalDevice = instance.enumeratePhysicalDevices().front();
        vk::raii::Device device(physicalDevice, vk::DeviceCreateInfo{});

        // Use Vulkan objects
        vk::raii::Buffer buffer(device, vk::BufferCreateInfo{});
    }
    catch (const vk::SystemError& err)
    {
        std::cerr 

Or use the tuple:

    vk::raii::Context context;
    ...
    auto instanceRV = context.createInstance(...);
    if (!instanceRV.has_value())
    {
        std::cerr 

This example is from later parts of our tutorial, it is just an example
of how to check for errors in all of your calls.

If using macOS with the latest MoltenVK sdk, you may get `vk::Result::eErrorIncompatibleDriver`,
thrown from `vk::raii::createInstance` or the vk::raii::Instance constructor. According to the
[Getting Start Notes](https://vulkan.lunarg.com/doc/sdk/1.3.216.0/mac/getting_started.html).
Beginning with the 1.3.216 Vulkan SDK, the `VK_KHR_PORTABILITY_subset` extension is mandatory.

To get over this error, first add the `vk::InstanceCreateFlagBits::eEnumeratePortabilityKHR` bit
to `vk::InstanceCreateInfo` struct flags, then add `vk::KHRPortabilityEnumerationExtensionName`
to instance enabled extension list.

Typically, the code could be like this:

constexpr vk::ApplicationInfo appInfo{.pApplicationName   = "Hello Triangle",
                                      .applicationVersion = VK_MAKE_VERSION( 1, 0, 0 ),
                                      .pEngineName        = "No Engine",
                                      .engineVersion      = VK_MAKE_VERSION( 1, 0, 0 ),
                                      .apiVersion         = vk::ApiVersion14};
vk::InstanceCreateInfo createInfo{
    .flags = vk::InstanceCreateFlagBits::eEnumeratePortabilityKHR,
    .pApplicationInfo = &appInfo,
    .ppEnabledExtensionNames = { vk::KHRPortabilityEnumerationExtensionName }
};
instance = vk::raii::Instance(m_context, createInfo);

If you look at the `vkCreateInstance` documentation then you’ll see that one of
the possible error codes is `VK_ERROR_EXTENSION_NOT_PRESENT`. We could simply
specify the extensions we require and terminate if that error code comes back.
That makes sense for essential extensions like the window system interface, but
what if we want to check for optional functionality?

To retrieve a list of supported extensions before creating an instance, there’s
the `vk::raii::Context::enumerateInstanceExtensionProperties` function. It returns
a vector of the available extensions, which allows us to filter extensions by a
specific validation layer, which we’ll ignore for now.

auto extensions = context.enumerateInstanceExtensionProperties();

Each `vk::ExtensionProperties` struct contains the name and version of an
extension. We can list them with a simple for loop (`\t` is a tab for
indentation):

std::cout 

You can add this code to the `createInstance` function if you’d like to provide
some details about the Vulkan support.

Before continuing with the more complex steps after instance creation, it’s time
to evaluate our debugging options by checking out [validation layers](02_Validation_layers.html).

[C++ code](../../_attachments/01_instance_creation.cpp)
